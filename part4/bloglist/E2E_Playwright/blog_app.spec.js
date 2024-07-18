const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, deleteBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request  }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    console.log('Checking for Login form elements');
    const header = await page.getByText('Log in to application')
    const usernameInput = await page.locator('input[data-testid="username"]')
    const passwordInput = await page.locator('input[data-testid="password"]')
    const loginButton = await page.locator('button', { hasText: 'login' })

    await expect(header).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://testblog.com'
      }
      await createBlog(page, newBlog)
      await expect(page.getByText(`New blog "${newBlog.title}" added`)).toBeVisible()

      const blogTitle = await page.locator(`data-testid=blog-title`, {hasText: newBlog.title })
      const blogAuthor = await page.locator(`data-testid=blog-author`, { hasText: newBlog.author })
      await expect(blogTitle).toBeVisible()
      await expect(blogAuthor).toBeVisible()
    })
    describe('Blog exists', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        const newBlog = {
          title: 'Test Blog2',
          author: 'Test Author2',
          url: 'https://testblog2.com'
        }
        await createBlog(page, newBlog)
      })

      test('Blog can be liked', async ({ page }) => {
        const viewButton = await page.getByRole('button', { name: 'View' })
        await viewButton.click()
  
        const likeButton = await page.locator('data-testid=like-button')
        const likesCount = await page.locator('data-testid=blog-likes')
  
        const initialLikes = await likesCount.innerText()
  
        await likeButton.click()
  
        const expectedLikes = parseInt(initialLikes, 10) + 1
        await expect(likesCount).toHaveText(`${expectedLikes} likes`)
      })

      test('Delete blog', async ({ page }) => {
        const newBlog = {
          title: 'Delete',
          author: 'Del Author',
          url: 'https://delete.com'
        }
        await createBlog(page, newBlog)

        await deleteBlog(page, 'Delete', 'Del Author')
    
        const blogTitle = await page.locator(`data-testid=blog-title`, {hasText: newBlog.title })
        const blogAuthor = await page.locator(`data-testid=blog-author`, { hasText: newBlog.author })
        await expect(blogTitle).not.toBeVisible()
        await expect(blogAuthor).not.toBeVisible()
      })
    })
  })
  describe('Blogs are in order', () => {
    test('Blogs are arranged by likes in descending order', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await createBlog(page, { title: 'Blog 1', author: 'Author 1', url: 'www.1.fi' })
      await createBlog(page, { title: 'Blog 2', author: 'Author 2', url: 'www.2.fi' })
      await createBlog(page, { title: 'Blog 3', author: 'Author 3', url: 'www.3.fi' })

      await likeBlog(page, 'Blog 1', 'Author 1')
      await likeBlog(page, 'Blog 2', 'Author 2')
      await likeBlog(page, 'Blog 2', 'Author 2') // Blog 2 has more likes
      await likeBlog(page, 'Blog 3', 'Author 3')
      await likeBlog(page, 'Blog 3', 'Author 3')
      await likeBlog(page, 'Blog 3', 'Author 3') // Blog 3 has the most likes

      await page.reload()

      const blogTitles = await page.$$eval('[data-testid="blog-title"]', elements =>
        elements.map(element => element.textContent.trim())
      )

      expect(blogTitles).toEqual(['Blog 3', 'Blog 2', 'Blog 1']);
    })
  })
})
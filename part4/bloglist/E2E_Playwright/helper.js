const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
  const createBlog = async (page, content) => {
    await page.getByRole('button', { name: 'New Blog' }).click()
    await page.fill('input[data-testid="title"]', content.title)
    await page.fill('input[data-testid="author"]', content.author)
    await page.fill('input[data-testid="url"]', content.url)
  
    await page.getByRole('button', { name: 'create' }).click()
  }


  const deleteBlog = async (page, blogTitle, blogAuthor) => {
    await page.click(`[data-testid="blog"][data-title="${blogTitle}"][data-author="${blogAuthor}"] button`)
    await page.click(`[data-testid="blog"][data-title="${blogTitle}"][data-author="${blogAuthor}"] [data-testid="delete-button"]`)
  }

// blogHelpers.js

const likeBlog = async (page, blogTitle, blogAuthor) => {
    await page.click(`[data-testid="blog"][data-title="${blogTitle}"][data-author="${blogAuthor}"] button`)
    const likeButton = await page.locator('data-testid=like-button')
    await likeButton.click()
    await page.click(`[data-testid="blog"][data-title="${blogTitle}"][data-author="${blogAuthor}"] button`)

  }
  
  export { loginWith, createBlog, deleteBlog, likeBlog }
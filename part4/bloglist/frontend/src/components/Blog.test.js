import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'New blog',
    author: 'New author',
    url: 'https://newblog.com/',
    user: { name: 'testUser', id: '1' },
    likes: 15,
    comments: []
  };

  const user = {
    username: 'test',
    name: 'testUser',
    password: '12345'
  };

  render(<Blog blog={blog} user={user} updateBlogLikes={() => {}} handleDeleteBlog={() => {}} />);

  expect(screen.getByText('New blog')).toBeInTheDocument();
  expect(screen.getByText('by New author')).toBeInTheDocument();
  expect(screen.queryByText('https://newblog.com/')).toBeNull();
  expect(screen.queryByText('15 likes')).toBeNull();
})

test('renders URL and number of likes when "View" button is clicked', async () => {
  const blog = {
    title: 'New blog',
    author: 'New author',
    url: 'https://newblog.com/',
    user: { name: 'testUser', id: '1' },
    likes: 15,
    comments: []
  };

  const user = {
    username: 'test',
    name: 'testUser',
    password: '12345'
  };

  const mockUpdateBlogLikes = jest.fn();
  const mockHandleDeleteBlog = jest.fn();

  render(
    <Blog 
      blog={blog} 
      user={user} 
      updateBlogLikes={mockUpdateBlogLikes} 
      handleDeleteBlog={mockHandleDeleteBlog} 
    />
  );

  expect(screen.queryByText(blog.url)).toBeNull();
  expect(screen.queryByText(`${blog.likes} likes`)).toBeNull();

  await userEvent.click(screen.getByText('View'));

  expect(screen.getByText(blog.url)).toBeInTheDocument();
  expect(screen.getByText(`${blog.likes} likes`)).toBeInTheDocument();
})

test('calls updateBlogLikes twice if like button is clicked twice', async () => {
  const blog = {
    title: 'New blog',
    author: 'New author',
    url: 'https://newblog.com/',
    user: { name: 'testUser', id: '1' },
    likes: 15,
    comments: []
  };

  const user = {
    username: 'test',
    name: 'testUser',
    password: '12345'
  };

  const mockUpdateBlogLikes = jest.fn();
  const mockHandleDeleteBlog = jest.fn();

  render(
    <Blog 
      blog={blog} 
      user={user} 
      updateBlogLikes={mockUpdateBlogLikes} 
      handleDeleteBlog={mockHandleDeleteBlog} 
    />
  );

  await userEvent.click(screen.getByText('View'));

  const likeButton = screen.getByText('Like');
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(mockUpdateBlogLikes).toHaveBeenCalledTimes(2);
})
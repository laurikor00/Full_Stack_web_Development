import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';

test('calls createBlog with the right details when a new blog is created', async () => {
  const mockCreateBlog = jest.fn();

  render(<BlogForm createBlog={mockCreateBlog} />);

  const titleInput = screen.getByLabelText('title');
  const authorInput = screen.getByLabelText('author');
  const urlInput = screen.getByLabelText('url');
  const createButton = screen.getByRole('button', { name: /create/i });

  await userEvent.type(titleInput, 'Test Blog Title');
  await userEvent.type(authorInput, 'Test Author');
  await userEvent.type(urlInput, 'https://testblog.com');

  await userEvent.click(createButton);

  expect(mockCreateBlog).toHaveBeenCalledTimes(1);
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'https://testblog.com',
  })
})



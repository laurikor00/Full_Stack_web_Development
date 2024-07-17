const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!request.user || !request.user.id) {
    return response.status(401).json({ error: 'User missing or invalid token' });
  }

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    console.error('Failed to save blog', error);
    response.status(500).json({ error: 'Failed to save blog' });
  }
});

router.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user;
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Unauthorized to delete this blog' });
    }
    await blog.deleteOne(); // Use deleteOne method to delete the blog
    response.status(204).end();
  } catch (error) {
    console.error('Failed to delete blog', error);
    response.status(500).json({ error: 'Failed to delete blog' });
  }
});

router.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 });
    response.json(updatedBlog);
  } catch (error) {
    console.error('Failed to update blog', error);
    response.status(500).json({ error: 'Failed to update blog' });
  }
});

module.exports = router

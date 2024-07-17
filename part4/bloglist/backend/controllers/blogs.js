const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})
/*
router.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user

  if (!user ) {
    return response.status(403).json({ error: 'user missing' })
  }  

  if (!blog.title || !blog.url ) {
    return response.status(400).json({ error: 'title or url missing' })
  }   

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})*/

router.post('/', userExtractor, async (request, response) => {
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

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  if ( user.id.toString() !== blog.user.toString() ) {
    return response.status(403).json({ error: 'user not authorized' })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())

  await user.save()

  response.status(204).end()
})

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

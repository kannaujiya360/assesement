const asyncHandler = require('express-async-handler');
const Task = require('../models/task.model');

// @route  POST /api/tasks
// @desc   Create a new task
// @access Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, tags } = req.body;
  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    description: description || '',
    status: status || 'pending',
    tags: Array.isArray(tags) ? tags : (tags ? [tags] : [])
  });

  res.status(201).json(task);
});

// @route  GET /api/tasks
// @desc   Get tasks for current user (with optional search & filter & pagination)
// @access Private
const getTasks = asyncHandler(async (req, res) => {
  const { q, status, tag, page = 1, limit = 10 } = req.query;
  const filter = { user: req.user._id };

  if (status) filter.status = status;
  if (tag) filter.tags = tag;

  if (q) {
    // basic text search on title and description
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }

  const skip = (Math.max(parseInt(page, 10), 1) - 1) * parseInt(limit, 10);
  const tasks = await Task.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit, 10));

  const total = await Task.countDocuments(filter);

  res.json({ data: tasks, page: parseInt(page, 10), limit: parseInt(limit, 10), total });
});

// @route  GET /api/tasks/:id
// @desc   Get single task
// @access Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.json(task);
});

// @route  PUT /api/tasks/:id
// @desc   Update a task
// @access Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Task not found');
  }

  const { title, description, status, tags } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (tags !== undefined) task.tags = Array.isArray(tags) ? tags : (tags ? [tags] : []);

  const updated = await task.save();
  res.json(updated);
});


const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.remove();
  res.json({ message: 'Task removed' });
});

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };

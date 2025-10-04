const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');

const router = express.Router();

router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;

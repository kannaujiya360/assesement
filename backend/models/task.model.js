const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
    tags: [{ type: String }]
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

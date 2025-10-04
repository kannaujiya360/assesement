
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const taskRoutes = require('./routes/task.routes');


const app = express();


const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/assignment_db';
connectDB(MONGO_URI);


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));




app.use(express.json());

app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/tasks', taskRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});


app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

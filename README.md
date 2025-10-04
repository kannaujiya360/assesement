 Frontend Developer Intern Assignment

Project Overview
This project is a **Scalable Web Application** built with **React.js** and **Tailwind CSS**.  
It includes a **dashboard**, **authentication (signup/login)**, and **CRUD operations** for a sample entity (`tasks`).  

Primary Focus:** Frontend development  
Backend:** Lightweight Node.js + Express + MongoDB for API support  

---

## Features

### Frontend
- Built with **React.js**
- Responsive design using **Tailwind CSS**
- Forms with client-side validation
- Protected routes (dashboard requires login)
- Dashboard displaying:
  - User profile
  - Task management (Create, Read, Update, Delete)
  - Search & filter functionality
- Logout flow

### Backend (Supportive)
- **Node.js + Express** backend
- MongoDB for data storage
- JWT-based authentication
- Password hashing with bcrypt
- CRUD APIs for tasks
- Profile fetch & update endpoints
- Proper error handling

### Security & Scalability
- Passwords hashed using **bcrypt**
- JWT authentication middleware
- Modular project structure for easy scaling
- Validation using `express-validator`


PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/assignment_db
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development


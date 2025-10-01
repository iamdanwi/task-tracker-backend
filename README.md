# Task Tracker API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Secure-orange?logo=jsonwebtokens)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A secure **Task Management API** built with **Node.js, Express, MongoDB, and JWT**. Features user authentication, task management, and secure cookie-based sessions.

---

## 🚀 Features

- User Authentication
  - Register new account
  - Login with JWT
  - Secure logout
  - Token verification
- User Management
  - Change email address
  - Update password
  - Delete account
  - View profile
- Task Management
  - Create new tasks
  - Update existing tasks
  - Delete tasks
  - List all tasks
  - Mark tasks as completed/pending

---

## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   MONGO_URI=mongodb://localhost:27017/todo
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=3001
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

---

## 🔑 API Endpoints

### Auth Routes

#### Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secret123"}'
```

#### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

#### Logout
```bash
curl -X POST http://localhost:3001/api/auth/logout
```

### User Routes

#### Get User Profile
```bash
curl -X GET http://localhost:3001/api/user/get-user \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Change Email
```bash
curl -X PUT http://localhost:3001/api/user/change-email \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"newEmail":"newemail@example.com"}'
```

#### Change Password
```bash
curl -X PUT http://localhost:3001/api/user/change-password \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"oldPassword":"old123","newPassword":"new123"}'
```

### Task Routes

#### Create Task
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Complete Project","description":"Finish the API","dueDate":"2024-03-20"}'
```

#### Get All Tasks
```bash
curl -X GET http://localhost:3001/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Task
```bash
curl -X PUT http://localhost:3001/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

#### Delete Task
```bash
curl -X DELETE http://localhost:3001/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie handling
- **cors** - CORS support
- **dotenv** - Environment variables

---

## 🧑‍💻 Author

Built by [iamdanwi](https://github.com/iamdanwi)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

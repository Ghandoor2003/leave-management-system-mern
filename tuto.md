
# Tuto for Leave management System

## I- Backend


### I-1- Setup
Backend Setup for Leave Management System
```bash
mkdir leave-management-backend
cd leave-management-backend
npm init -y
npm install express mongoose dotenv cors
npm install --save-dev nodemon
mkdir src
touch src/index.js
touch .env
```

Add this to `package.json`
```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```


### I-2- Basic Server:

src/index.js
```javascript
    // src/index.js

    import express from 'express';
    import mongoose from 'mongoose';
    import cors from 'cors';
    import dotenv from 'dotenv';

    // Load environment variables from .env file
    dotenv.config();

    const app = express();
    const port = process.env.PORT || 5000;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

    // Basic route
    app.get('/', (req, res) => {
    res.send('Welcome to the Leave Management System API');
    });

    // Start the server
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
 ```

 ### I-3- Routes

 ```bash
 mkdir src/routes
 touch src/routes/authRoutes.js src/routes/userRoutes.js src/routes/leaveRoutes.js
 ```

src/routes/authRoutes.js
 ```javascript
import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Logout (optional, often handled on the client side)
router.post('/logout', logout);

export default router;

 ```

 src/routes/userRoutes.js
 ```javascript
 import express from 'express';
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  // Handle get all users
});

// Get user by ID
router.get('/:id', (req, res) => {
  // Handle get user by ID
});

// Update user
router.put('/:id', (req, res) => {
  // Handle update user
});

// Delete user
router.delete('/:id', (req, res) => {
  // Handle delete user
});

export default router;
 ```

 src/routes/leaveRoutes.js
 ```javascript
 import express from 'express';
const router = express.Router();

// Create leave request
router.post('/', (req, res) => {
  // Handle create leave request
});

// Get all leave requests
router.get('/', (req, res) => {
  // Handle get all leave requests
});

// Get leave request by ID
router.get('/:id', (req, res) => {
  // Handle get leave request by ID
});

// Update leave request status
router.put('/:id/status', (req, res) => {
  // Handle update leave request status
});

// Delete leave request
router.delete('/:id', (req, res) => {
  // Handle delete leave request
});
 ```

### I-3- Models

```bash
mkdir src/modles
touch src/modles/User.js src/modles/LeaveRequest.js
```
src/modles/User.js
```javascript
// src/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);

export default User;
```

src/modles/LeaveRequest.js
```javascript

import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['sick', 'vacation', 'personal'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  reason: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

export default LeaveRequest;
```

### I-4- Auth
we will need:
- Auth middleware : to protect routes and verify tokens
- Auth controller
- routes

```bash
mkdir src/middleweare
touch src/middleware/authMiddleware.js
```

```javascript

i want to make a leave management system using vite / mern /mongo db ... give me only the cmd needed to set up the backend
ChatGPT

To set up the backend of your leave management system using Express, MongoDB, and Vite, follow these commands:

    Create a new directory and navigate into it:

    bash

mkdir leave-management-backend
cd leave-management-backend

Initialize a new Node.js project:

bash

npm init -y

Install necessary dependencies:

bash

npm install express mongoose dotenv cors

Install development dependencies:

bash

npm install --save-dev nodemon

Create a basic project structure:

bash

mkdir src
touch src/index.js

Create a .env file for environment variables:

bash

touch .env

Add start script to package.json:

json

    "scripts": {
      "start": "node src/index.js",
      "dev": "nodemon src/index.js"
    }

This sets up a basic Express backend with MongoDB integration. You can start building your routes, models, and controllers within the src directory.
can you put what u told me in an .md file
ChatGPT

Certainly! Here’s a Markdown file (SETUP.md) containing the instructions for setting up the backend:

markdown

# Backend Setup for Leave Management System

## 1. Create a New Directory and Navigate Into It

```bash
mkdir leave-management-backend
cd leave-management-backend

2. Initialize a New Node.js Project

bash

npm init -y

3. Install Necessary Dependencies

bash

npm install express mongoose dotenv cors

4. Install Development Dependencies

bash

npm install --save-dev nodemon

5. Create a Basic Project Structure

bash

mkdir src
touch src/index.js

6. Create a .env File for Environment Variables

bash

touch .env

7. Add Start Script to package.json

Edit the package.json file and add the following scripts:

json

"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}

You now have a basic setup for your backend using Express, MongoDB, and Vite. Start building your routes, models, and controllers within the src directory.

css


Feel free to save this content into a file named `SETUP.md` for your reference!

make it all an .md file even the titles
ChatGPT

Here’s the complete .md file with titles included:

markdown

# Backend Setup for Leave Management System

## 1. Create a New Directory and Navigate Into It

```bash
mkdir leave-management-backend
cd leave-management-backend

2. Initialize a New Node.js Project

bash

npm init -y

3. Install Necessary Dependencies

bash

npm install express mongoose dotenv cors

4. Install Development Dependencies

bash

npm install --save-dev nodemon

5. Create a Basic Project Structure

bash

mkdir src
touch src/index.js

6. Create a .env File for Environment Variables

bash

touch .env

7. Add Start Script to package.json

Edit the package.json file and add the following scripts:

json

"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}

You now have a basic setup for your backend using Express, MongoDB, and Vite. Start building your routes, models, and controllers within the src directory.

csharp


You can save this content into a file named `SETUP.md`.

now make me src/index.js
ChatGPT

Certainly! Here’s a basic src/index.js file to get you started with your Express server setup:

javascript

// src/index.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Leave Management System API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

Instructions for src/index.js:

    Import Dependencies: Import necessary packages including express, mongoose, cors, and dotenv.
    Load Environment Variables: Use dotenv to load environment variables from a .env file.
    Initialize Express App: Create an Express app instance.
    Configure Middleware: Use CORS and JSON middleware.
    Connect to MongoDB: Connect to MongoDB using the connection string from the .env file.
    Basic Route: Define a basic route for testing.
    Start Server: Listen for incoming requests on the specified port.

Make sure you have a .env file with the MONGO_URI variable set to your MongoDB connection string. For example:

arduino

MONGO_URI=mongodb://your_mongodb_uri

You can save this code into src/index.js in your project directory.
give all the routes to implement in the backend
ChatGPT

For a comprehensive Leave Management System, you'll likely need to implement several routes to handle various functionalities. Here’s a list of routes you might consider implementing in your backend, along with a brief description of each:
User Authentication Routes

    Register User
        POST /api/auth/register
        Description: Register a new user (admin or employee).

    Login User
        POST /api/auth/login
        Description: Authenticate a user and issue a JWT token.

    Logout User
        POST /api/auth/logout
        Description: Invalidate the user’s token (if using a session-based auth).

User Management Routes (Admin Only)

    Get All Users
        GET /api/users
        Description: Retrieve a list of all users.

    Get User by ID
        GET /api/users/:id
        Description: Retrieve a user’s details by ID.

    Update User
        PUT /api/users/:id
        Description: Update user details.

    Delete User
        DELETE /api/users/:id
        Description: Delete a user.

Leave Request Routes

    Create Leave Request
        POST /api/leaves
        Description: Submit a new leave request.

    Get All Leave Requests
        GET /api/leaves
        Description: Retrieve all leave requests (can be filtered by user or status).

    Get Leave Request by ID
        GET /api/leaves/:id
        Description: Retrieve a specific leave request by ID.

    Update Leave Request Status
        PUT /api/leaves/:id/status
        Description: Update the status of a leave request (e.g., approved or rejected).

    Delete Leave Request
        DELETE /api/leaves/:id
        Description: Delete a leave request.

Profile Management Routes

    Get Profile
        GET /api/profile
        Description: Retrieve the current user’s profile.

    Update Profile
        PUT /api/profile
        Description: Update the current user’s profile details.

Optional Routes (Depending on Additional Features)

    Search Leave Requests
        GET /api/leaves/search
        Description: Search leave requests based on various criteria.

    Generate Leave Reports
        GET /api/leaves/reports
        Description: Generate reports on leave requests.

Example Implementation in Express

You can implement these routes in your Express app by creating route handlers. Here’s an example of how to structure these routes:

javascript

// src/routes/authRoutes.js
import express from 'express';
const router = express.Router();

// Register
router.post('/register', (req, res) => {
  // Handle user registration
});

// Login
router.post('/login', (req, res) => {
  // Handle user login
});

// Logout
router.post('/logout', (req, res) => {
  // Handle user logout
});

export default router;

// src/routes/userRoutes.js
import express from 'express';
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  // Handle get all users
});

// Get user by ID
router.get('/:id', (req, res) => {
  // Handle get user by ID
});

// Update user
router.put('/:id', (req, res) => {
  // Handle update user
});

// Delete user
router.delete('/:id', (req, res) => {
  // Handle delete user
});

export default router;

// src/routes/leaveRoutes.js
import express from 'express';
const router = express.Router();

// Create leave request
router.post('/', (req, res) => {
  // Handle create leave request
});

// Get all leave requests
router.get('/', (req, res) => {
  // Handle get all leave requests
});

// Get leave request by ID
router.get('/:id', (req, res) => {
  // Handle get leave request by ID
});

// Update leave request status
router.put('/:id/status', (req, res) => {
  // Handle update leave request status
});

// Delete leave request
router.delete('/:id', (req, res) => {
  // Handle delete leave request
});

export default router;

// src/routes/profileRoutes.js
import express from 'express';
const router = express.Router();

// Get profile
router.get('/', (req, res) => {
  // Handle get profile
});

// Update profile
router.put('/', (req, res) => {
  // Handle update profile
});

export default router;

Make sure to import and use these routes in your src/index.js:

javascript

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/profile', profileRoutes);

Feel free to customize these routes based on the specific requirements and features of your Leave Management System.
what is the difference between get user and get profile
ChatGPT

The GET /api/users/:id and GET /api/profile routes serve different purposes in a typical backend setup:
GET /api/users/:id

    Purpose: Retrieve detailed information about a specific user.
    Access: Usually accessible by admin users or users with the appropriate permissions.
    Usage: Used to fetch details of any user in the system based on their user ID.
    Example Response:

    json

    {
      "id": "user123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "employee",
      "createdAt": "2024-01-01T12:00:00Z"
    }

    Typical Use Case: Admins need to view or manage detailed information about other users, such as for user management or reporting purposes.

GET /api/profile

    Purpose: Retrieve information about the currently authenticated user.
    Access: Accessible by the logged-in user only; it returns the profile of the user making the request.
    Usage: Used to fetch the current user's details, often for displaying profile information or updating user settings.
    Example Response:

    json

    {
      "id": "user456",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "role": "admin",
      "createdAt": "2024-02-01T12:00:00Z"
    }

    Typical Use Case: A user wants to view or update their own profile information, or the frontend needs to display the current user's details.

Summary

    GET /api/users/:id: Fetches information about any user by their ID, typically used by admins or users with special permissions.
    GET /api/profile: Fetches information about the currently logged-in user, typically used for user-specific data and settings.

This separation ensures that profile information is always relevant to the authenticated user, while user details management and information retrieval are handled differently.
as this is a simple project we will be meshing those two togather by using only users
ChatGPT

Got it! In that case, you’ll use the GET /api/users route to handle both retrieving a specific user by ID and getting the profile of the currently authenticated user. Here’s how you might structure it:
Updated Route

    Route: GET /api/users
    Functionality:
        If an id query parameter is provided, retrieve the user with that ID.
        If no id query parameter is provided, retrieve the profile of the currently authenticated user.

Example Implementation

javascript

// src/routes/userRoutes.js
import express from 'express';
import User from '../models/User.js'; // Assuming you have a User model
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware to handle authentication
const router = express.Router();

// Get user(s)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.query.id) {
      // Retrieve user by ID
      const user = await User.findById(req.query.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user);
    }

    // Retrieve profile of currently authenticated user
    const user = await User.findById(req.user.id); // req.user.id is set by authMiddleware
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

Middleware for Authentication

You will need a middleware to authenticate and set req.user with the authenticated user’s ID:

javascript

// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;

Example .env Configuration

Make sure to include the following in your .env file:

makefile

JWT_SECRET=your_jwt_secret

This setup allows you to use a single endpoint for both functionalities, keeping things simpler for your project.
give a bash code to generate a jwt secret
ChatGPT

You can generate a secure JWT secret using the openssl command-line tool. Here’s a bash command to generate a random JWT secret:

bash

openssl rand -base64 32

Explanation:

    openssl rand -base64 32 generates a 32-byte random value and encodes it in base64 format, which is typically a good length and format for a JWT secret.

Example Output:

bash

Ew4T8fVj+fWcV7nX5UyKw1C4nWujYQhRbZCd7vUdeQk=

You can copy this output and use it as your JWT_SECRET in your .env file:

env

JWT_SECRET=Ew4T8fVj+fWcV7nX5UyKw1C4nWujYQhRbZCd7vUdeQk=

Make sure to keep your JWT secret secure and private.
now let us make the   models
ChatGPT

For your Leave Management System, you'll need at least two models: User and LeaveRequest. Below are example implementations for these models using Mongoose.
User Model

The User model will include fields for user information and authentication.

javascript

// src/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);

export default User;

LeaveRequest Model

The LeaveRequest model will manage leave requests submitted by users.

javascript

// src/models/LeaveRequest.js

import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['sick', 'vacation', 'personal'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  reason: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

export default LeaveRequest;

Summary of Models

    User Model:
        name: User's name.
        email: User's email address.
        password: User's hashed password.
        role: User's role (admin or employee).
        Includes methods for password comparison and JWT generation.

    LeaveRequest Model:
        user: Reference to the user who submitted the request.
        leaveType: Type of leave (sick, vacation, personal).
        startDate: Start date of the leave.
        endDate: End date of the leave.
        status: Current status of the leave request (pending, approved, rejected).
        reason: Reason for the leave request.

These models should be defined in the src/models directory and used in your routes and controllers to manage users and leave requests.
now let us go on to the auth
ChatGPT

For handling authentication in your Leave Management System, you’ll need to implement the following components:

    Authentication Middleware: To protect routes and verify tokens.
    Auth Controller: To handle user registration, login, and logout.
    Routes: To map authentication endpoints to their corresponding controllers.

1. Authentication Middleware

This middleware will check if a request has a valid JWT token and attach the user information to the request.

javascript

// src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;

2. Auth Controller

Handles user registration, login, and logout functionality.

javascript

// src/controllers/authController.js

import User from '../models/User.js';

// Register a new user
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error registering user' });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error logging in' });
  }
};

// Logout a user (optional, depends on your token strategy)
// This endpoint might just clear the token on the client side
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

3. Auth Routes

Define routes for authentication that map to the controller functions.

javascript

// src/routes/authRoutes.js

import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Logout (optional, often handled on the client side)
router.post('/logout', logout);

export default router;

Summary of Implementation

    authMiddleware.js: Protects routes by verifying JWT tokens and attaching user information.
    authController.js:
        register: Registers a new user and returns a JWT token.
        login: Authenticates a user and returns a JWT token.
        logout: Optional; handles user logout.
    authRoutes.js: Defines the authentication endpoints and maps them to the controller functions.

Adding to index.js

Ensure these routes are used in your main application file (src/index.js):

javascript

import authRoutes from './routes/authRoutes.js';

app.use('/api/auth', authRoutes);

With this setup, you’ll be able to handle user registration, login, and token-based authentication effectively in your Leave Management System.
what is yet to be implemented ?
ChatGPT

Here's a summary of what you need to implement to complete your Leave Management System:
1. Controllers for Leave Requests

    Create Leave Request: Handle the logic for submitting a new leave request.
    Get All Leave Requests: Retrieve all leave requests, with optional filters for user or status.
    Get Leave Request by ID: Retrieve a specific leave request by its ID.
    Update Leave Request Status: Allow updating the status of a leave request (approve/reject).
    Delete Leave Request: Remove a leave request from the system.

2. Leave Request Routes

    Define routes and connect them to the leave request controller functions.

3. Role-Based Access Control

    Implement logic to differentiate between admin and employee functionalities.
    Ensure that only admins can perform certain actions like updating or deleting leave requests.

4. Error Handling

    Implement robust error handling for various failure scenarios (e.g., invalid input, unauthorized access).

5. Validation and Sanitization

    Add input validation and sanitization to ensure data integrity and security.

6. Testing

    Write unit and integration tests for your routes and controllers.
    Use tools like Postman for manual testing of your API endpoints.

7. Documentation

    Document your API endpoints, request/response formats, and authentication details.
    Consider using tools like Swagger or Postman for API documentation.

8. Environment Configuration

    Ensure that all environment variables (e.g., MONGO_URI, JWT_SECRET) are correctly configured in the .env file.

9. Frontend Integration

    If you’re building a frontend, ensure it integrates correctly with your backend API endpoints.
    Implement authentication flows on the frontend (e.g., handling JWT tokens).

Example Implementation for Leave Requests
Controller Example

javascript

// src/controllers/leaveController.js

import LeaveRequest from '../models/LeaveRequest.js';

// Create leave request
export const createLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  try {
    const leaveRequest = new LeaveRequest({
      user: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating leave request' });
  }
};

// Get all leave requests
export const getAllLeaveRequests = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user.id };
    const leaveRequests = await LeaveRequest.find(filter);
    res.json(leaveRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leave request by ID
export const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update leave request status
export const updateLeaveRequestStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    leaveRequest.status = status;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete leave request
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    await leaveRequest.remove();
    res.json({ message: 'Leave request deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

Routes Example

javascript

// src/routes/leaveRoutes.js

import express from 'express';
import {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestStatus,
  deleteLeaveRequest
} from '../controllers/leaveController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create leave request
router.post('/', authMiddleware, createLeaveRequest);

// Get all leave requests
router.get('/', authMiddleware, getAllLeaveRequests);

// Get leave request by ID
router.get('/:id', authMiddleware, getLeaveRequestById);

// Update leave request status
router.put('/:id/status', authMiddleware, updateLeaveRequestStatus);

// Delete leave request
router.delete('/:id', authMiddleware, deleteLeaveRequest);

export default router;

Integrate these routes into your main application file (src/index.js):

javascript

import leaveRoutes from './routes/leaveRoutes.js';

app.use('/api/leaves', leaveRoutes);

With these components, you’ll be able to handle leave request management effectively in your Leave Management System.
let us get with Role based access control
ChatGPT

To implement Role-Based Access Control (RBAC) in your Leave Management System, you'll need to manage access based on user roles. In this case, we will have two roles: admin and employee. The admin will have broader permissions, while the employee will have limited access.
Steps for Implementing Role-Based Access Control

    Update Authentication Middleware: Verify user roles and restrict access to routes based on roles.
    Add Role Checks to Controllers: Ensure controllers enforce role-based access rules.
    Define Route Protection: Apply middleware to routes to enforce role-based access.

1. Update Authentication Middleware

Enhance the authentication middleware to handle role-based checks:

javascript

// src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (!req.user) return res.status(401).json({ message: 'User not found' });

      // Check if the user's role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

export default authMiddleware;
 ```

 ```bash
mkdir src/controllers
touch src/controllers/authController.js
```

```js

import User from '../models/User.js';

// Register a new user
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error registering user' });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error logging in' });
  }
};

// Logout a user (optional, depends on your token strategy)
// This endpoint might just clear the token on the client side
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
```

```js
// src/controllers/leaveController.js

import LeaveRequest from '../models/LeaveRequest.js';

// Create leave request
export const createLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  try {
    const leaveRequest = new LeaveRequest({
      user: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating leave request' });
  }
};

// Get all leave requests
export const getAllLeaveRequests = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user.id };
    const leaveRequests = await LeaveRequest.find(filter);
    res.json(leaveRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leave request by ID
export const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update leave request status
export const updateLeaveRequestStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    leaveRequest.status = status;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete leave request
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    await leaveRequest.remove();
    res.json({ message: 'Leave request deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

```
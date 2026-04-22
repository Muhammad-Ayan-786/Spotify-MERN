const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* <---------- Register User ----------> */
async function registerUser(req, res) {
  const { username, email, password, role = 'user' } = req.body

  // Check if user already exists
  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })

  // If user already exists
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exists"
    })
  }
  // Hash password
  const hash = await bcrypt.hash(password, 10);

  // Create user
  const user = await userModel.create({
    username,
    email,
    password: hash,
    role
  })

  res.status(201).json({
    message: "User register successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  })

}

/* <---------- Login User ----------> */
async function loginUser(req, res) {
  const { username, email, password } = req.body

  // Check if user exists
  const user = await userModel.findOne({
    $or: [
      { username },
      { email }]
  })

  // If user doesn't exist
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    })
  }

  // Check if password is valid
  const isPasswordValid = await bcrypt.compare(password, user.password)

  // If password is invalid
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials"
    })
  }

  // Create token
  const token = jwt.sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET)

  // Store token in Headers
  res.header('Authorization', `Bearer ${token}`);

  // Send response
  res.status(200).json({
    message: "User login successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  })
}

// <---------- Logout User ---------->
async function logoutUser(req, res) {
  res.status(200).json({
    message: "User logout successfully"
  })
}

async function getUser(req, res) {

  // Check if user is authenticated
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  // If user is not authenticated
  if (!token) {
    res.status(401).json({
      message: "Unauthorized"
    })
  }

  // Verify token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  // Get user
  const user = await userModel.findOne({
    _id: decodedToken.id
  })

  // Send response
  res.status(200).json({
    message: "User found successfully",
    user: {
      username: user.username,
      email: user.email,
      role: user.role
    }
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser
};
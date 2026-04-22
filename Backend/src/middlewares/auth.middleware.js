const jwt = require('jsonwebtoken');

// Middleware to check if user is artist
async function authArtist(req, res, next) {

  // Check if user is authenticated
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  // If user is not authenticated
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  // Check if user is artist
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // If user is not artist
    if (decoded.role !== 'artist') {
      return res.status(403).json({
        message: "Your don't have access"
      })
    }

    // Add user to request
    req.user = decoded

    // If user is artist
    next();

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Unauthorized"
    })
  }
}

// Middleware to check if user is authenticated
async function authUser(req, res, next) {

  // Check if user is authenticated
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  // If user is not authenticated
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  // Check if user is authenticated
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // If user is not authenticated
    if (decoded.role !== 'user' && decoded.role !== 'artist') {
      return res.status(403).json({
        message: "You don't have access"
      })
    }

    // Add user to request
    req.user = decoded

    // If user is authenticated
    next();

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Unauthorized"
    })
  }
}

module.exports = { authArtist, authUser };
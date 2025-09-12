// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // @route   POST api/auth/register
// // @desc    Register a new user
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let user = await User.findOne({ username });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({
//       username,
//       password,
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     res.status(201).send('User registered successfully');

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });
// // Add this code inside backend/routes/auth.js

// // @route   POST api/auth/login
// // @desc    Authenticate user & get token
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if user exists
//     let user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     // Compare the provided password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     // If credentials are correct, create a JWT payload
//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     // Sign the token
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 3600 }, // Token expires in 1 hour
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token }); // Send the token back to the client
//       }
//     );

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });
// module.exports = router;


const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a new user and return JWT token
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      username,
      password,
    });

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Prepare payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token and send response with token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // 1 hour expiry
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

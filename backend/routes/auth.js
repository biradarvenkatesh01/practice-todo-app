// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// // @route   POST api/auth/register
// // @desc    Register a new user
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ username });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Create a new user instance
//     user = new User({
//       username,
//       password,
//     });

//     // Hash the password before saving it to the database
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     // Save the new user
//     await user.save();

//     // Create a payload for the JWT
//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     // Sign the token and send it back
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 3600 }, // Token expires in 1 hour
//       (err, token) => {
//         if (err) throw err;
//         res.status(201).json({ token });
//       }
//     );

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route   POST api/auth/login
// // @desc    Authenticate user and get token
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if the user exists
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

//     // Sign the token and send it back to the client
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 3600 }, // Token expires in 1 hour
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });


// module.exports = router;

// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Login user and return JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

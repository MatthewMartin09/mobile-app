const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure you have the User model
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify token

// Signup route
router.post('/auth/signup', async (req, res) => {
  const { name, contactInput, password, dob, gender, barangay, contactType } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ contactInput });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      contactInput,
      password: hashedPassword,
      dob,
      gender,
      barangay,
      contactType,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with user data and token
    res.status(201).json({
      message: 'User signed up successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        contactInput: savedUser.contactInput,
        dob: savedUser.dob,
        gender: savedUser.gender,
        barangay: savedUser.barangay,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error signing up' });
  }
});

// Login route
router.post('/auth/login', async (req, res) => {
  const { contactInput, password } = req.body;

  try {
    const user = await User.findOne({ contactInput });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        contactInput: user.contactInput,
        dob: user.dob,
        gender: user.gender,
        barangay: user.barangay,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Middleware to protect the routes
router.use(authMiddleware);

// Get current user's data route
router.get('/auth/user', async (req, res) => {
  try {
    // Get user ID from the JWT token
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        contactInput: user.contactInput,
        dob: user.dob,
        gender: user.gender,
        barangay: user.barangay,
        favorites: user.favorites, // Include favorites in the response
      },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

// Update user's favorites route
router.post('/auth/user/:id/updateFavorites', async (req, res) => {
  try {
    const userId = req.params.id;
    const { favorites } = req.body;

    // Find the user by ID and update their favorites
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { favorites } },
      { new: true } // Return the updated user data
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return updated user data
    res.status(200).json({
      message: 'Favorites updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating favorites:', error);
    res.status(500).json({ message: 'Failed to update favorites' });
  }
});

module.exports = router;

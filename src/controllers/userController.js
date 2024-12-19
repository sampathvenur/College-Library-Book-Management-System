const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const user = await userService.loginUser(req.body);
  if (user) {
    res.json({ message: 'Login successful', userId: user._id });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const getUserBooks = async (req, res) => {
  const books = await userService.getUserBooks(req.params.id);
  if (books) {
    res.json(books);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const requestBook = async (req, res) => {
  const success = await userService.requestBook(req.params.id, req.params.bookId);
  if (success) {
    res.json({ message: 'Book request successful' });
  } else {
    res.status(400).json({ message: 'Book request failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserBooks,
  requestBook
};
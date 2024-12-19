const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');

const registerUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};

const getUserBooks = async (userId) => {
  const user = await User.findById(userId).populate('booksRequested');
  return user.booksRequested;
};

const requestBook = async (userId, bookId) => {
  const book = await Book.findById(bookId);
  if (!book || !book.available) {
    return false;
  }

  const user = await User.findById(userId);
  user.booksRequested.push(book._id);
  book.available = false;
  book.popularity += 1;
  
  await book.save();
  await user.save();
  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getUserBooks,
  requestBook
};
const Book = require('../models/Book');

const getAllBooks = async () => {
  return await Book.find().sort({ popularity: -1 });
};

const getBookById = async (id) => {
  return await Book.findById(id);
};

const addBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

const updateBook = async (id, updateData) => {
  return await Book.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
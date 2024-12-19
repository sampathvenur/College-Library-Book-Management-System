const bookService = require('../services/bookService');

const getAllBooks = async (req, res) => {
  const books = await bookService.getAllBooks();
  res.json(books);
};

const getBookById = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

const addBook = async (req, res) => {
  const newBook = await bookService.addBook(req.body);
  res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
  const updatedBook = await bookService.updateBook(req.params.id, req.body);
  if (updatedBook) {
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

const deleteBook = async (req, res) => {
  const result = await bookService.deleteBook(req.params.id);
  if (result) {
    res.json({ message: 'Book deleted successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
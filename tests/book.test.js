const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const Book = require('../src/models/Book');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Book Routes', () => {
  beforeEach(async () => {
    await Book.deleteMany({});
  });

  it('should get all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a new book', async () => {
    const book = { title: 'Test Book', author: 'Test Author', isbn: '1234567890' };
    const response = await request(app).post('/api/books').send(book);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(book.title);
    expect(response.body.author).toBe(book.author);
    expect(response.body.isbn).toBe(book.isbn);
  });

  it('should get a book by id', async () => {
    const book = new Book({ title: 'Test Book', author: 'Test Author', isbn: '1234567890' });
    await book.save();
    
    const response = await request(app).get(`/api/books/${book._id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(book.title);
  });

  it('should update a book', async () => {
    const book = new Book({ title: 'Test Book', author: 'Test Author', isbn: '1234567890' });
    await book.save();

    const response = await request(app).put(`/api/books/${book._id}`).send({ title: 'Updated Book' });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Book');
  });

  it('should delete a book', async () => {
    const book = new Book({ title: 'Test Book', author: 'Test Author', isbn: '1234567890' });
    await book.save();

    const response = await request(app).delete(`/api/books/${book._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
  });
});
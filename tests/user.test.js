const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Book = require('../src/models/Book'); 
const testSetup = require('./testSetup');

beforeAll(async () => {
  await testSetup(); 
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve)); 
});

describe('User Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Book.deleteMany({}); 
  });

  it('should register a new user', async () => {
    const user = { username: 'testuser', password: 'testpassword', email: 'testuser@example.com' };
    const response = await request(app).post('/api/users/register').send(user);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login an existing user', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword', email: 'testuser@example.com' });
    await user.save();
    const response = await request(app).post('/api/users/login').send({
      username: 'testuser',
      password: 'testpassword'
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should fail login with incorrect credentials', async () => {
    const response = await request(app).post('/api/users/login').send({
      username: 'nonexistentuser',
      password: 'wrongpassword'
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should get user books', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword', email: 'testuser@example.com' });
    await user.save();
    const book = new Book({ title: 'Test Book', author: 'Test Author', isbn: '1234567890' });
    await book.save();
    user.booksRequested.push(book._id);
    await user.save(); 
    const response = await request(app).get(`/api/users/${user._id}/books`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([book._id.toString()]); 
  });

  it('should request a book', async () => {
    const user = new User({ username: 'testuser', password: 'testpassword', email: 'testuser@example.com' });
    await user.save();
    const book = new Book({ title: 'Test Book', author: 'Test Author', isbn: '1234567890' });
    await book.save();
    const response = await request(app).post(`/api/users/${user._id}/requestBook/${book._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book request successful');
  });
});
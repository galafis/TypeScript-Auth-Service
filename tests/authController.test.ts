import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/authRoutes';
import { users } from '../src/controllers/authController'; // Import users array for testing

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Controller', () => {
  beforeEach(() => {
    // Clear the users array before each test to ensure isolation
    users.length = 0;
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('should not register a user with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Please enter all fields');
  });

  it('should not register an existing user', async () => {
    // Register first user
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    // Try to register the same user again
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser2',
        email: 'test@example.com',
        password: 'password1234',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it('should login an existing user', async () => {
    // First, register the user
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'loginuser',
        email: 'login@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Please enter all fields');
  });

  it('should not login with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should not login with invalid password', async () => {
    // First, register the user
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'wrongpassuser',
        email: 'wrongpass@example.com',
        password: 'correctpassword',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrongpass@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should allow access to protected route with valid token', async () => {
    // Register and login a user to get a valid token
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'protecteduser',
        email: 'protected@example.com',
        password: 'password123',
      });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'protected@example.com',
        password: 'password123',
      });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'You have access to protected data!');
  });

  it('should not allow access to protected route without token', async () => {
    const res = await request(app)
      .get('/api/auth/protected');
    expect(res.statusCode).toEqual(401);
  });

  it('should not allow access to protected route with invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/protected')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toEqual(403);
  });
});


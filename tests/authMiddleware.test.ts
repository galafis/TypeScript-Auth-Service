import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../src/middleware/authMiddleware';
import jwt from 'jsonwebtoken';

// Mock Request, Response, NextFunction
const mockRequest = (headers: any = {}, body: any = {}) => ({
  headers,
  body,
}) as Request;

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.sendStatus = jest.fn().mockReturnThis();
  return res as Response;
};

const mockNext: NextFunction = jest.fn();

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', () => {
    const req = mockRequest();
    const res = mockResponse();

    authenticateToken(req, res, mockNext);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    const req = mockRequest({ authorization: 'Bearer invalidtoken' });
    const res = mockResponse();

    authenticateToken(req, res, mockNext);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next if token is valid', () => {
    const validToken = jwt.sign({ user: { id: '123' } }, 'supersecretjwtkey', { expiresIn: '1h' });
    const req = mockRequest({ authorization: `Bearer ${validToken}` });
    const res = mockResponse();

    authenticateToken(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect((req as any).user).toMatchObject({ user: { id: '123' } });
  });
});


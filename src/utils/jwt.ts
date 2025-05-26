import jwt from 'jsonwebtoken';

const generateToken = (payload: any, secret: string, expiresIn: string = '1h') => {}

const verifyToken = (token: string, secret: string) => {}

const generateRefreshToken = (payload: any, secret: string, expiresIn: string = '7d') => {}

const verifyRefreshToken = (refreshToken: string, secret: string) => {}

export { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken };
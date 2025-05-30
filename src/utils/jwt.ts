import { config } from '@config';
import jwt from 'jsonwebtoken';

const generateAccessToken = (payload: any) => {
    const token = jwt.sign(payload, config.secretKey, {
        expiresIn: config.refreshTokenExpiresIn,
    });
    return token;
}

const verifyAccessToken = (token: string) => {
    const decoded = jwt.verify(token, config.secretKey);
    return decoded;
}

const generateRefreshToken = (payload: any) => {
    const token = jwt.sign(payload, config.refreshSecretKey, {
        expiresIn: config.refreshTokenExpiresIn,
    });
    return token;
}

const verifyRefreshToken = (refreshToken: string) => {
    const decoded = jwt.verify(refreshToken, config.refreshSecretKey);
    return decoded;
}

export { generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken };
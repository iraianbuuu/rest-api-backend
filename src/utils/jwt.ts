import { config } from '@config';
import jwt from 'jsonwebtoken';

const generateAccessToken = (payload: any) => {
    const token = jwt.sign(payload, config.accessTokenSecretKey, {
        expiresIn: config.accessTokenExpiresIn,
    });
    return token;
}

const verifyAccessToken = (token: string) => {
    const decoded = jwt.verify(token, config.accessTokenSecretKey);
    return decoded;
}

const generateRefreshToken = (payload: any) => {
    const token = jwt.sign(payload, config.refreshTokenSecretKey, {
        expiresIn: config.refreshTokenExpiresIn,
    });
    return token;
}

const verifyRefreshToken = (refreshToken: string) => {
    const decoded = jwt.verify(refreshToken, config.refreshTokenSecretKey);
    return decoded;
}

export { generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken };
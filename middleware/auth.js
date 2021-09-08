import jwt from 'jsonwebtoken';
import * as userData from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = {
    message: 'Authentication Error'
};

// 로그인 인증 미들웨어 함수
export async function isAuth(req, res, next) {
    const authHeader = req.get('Authorization');
    // 사용자가 JWT 인증을 이용하고 있는지
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        console.error('isAuth(): JWT token not used in req header');
        return res
            .status(401)
            .json({message: AUTH_ERROR});
    }
    const token = authHeader.split(' ')[1];

    // 유효한 jwt token인지 확인
    jwt.verify(token,
    config.jwt.secretKey,
    async (error, decoded) => {
        // 유효하지 않은 token인 경우
        if (error) {
            console.error('isAuth():', error);
            return res
                .status(401)
                .json({message: AUTH_ERROR});
        }
        const user = userData.FindById(decoded.id);
        // 등록된 사용자가 아닌 경우
        if (!user) {
            console.error('isAuth(): user not found');
            return res
                .status(401)
                .json({message: AUTH_ERROR});
        }
        req.userId = user.id;
        req.token = token;
        console.log('isAuth(): Auth Success:', req.userId, req.token);
        next();
    });
}
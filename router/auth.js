import express from 'express';
import {body, validationResult} from 'express-validator';
import * as authController from '../controller/auth.js';
import {isAuth} from '../middleware/auth.js';
import {Validate} from '../middleware/validate.js';

const router = express.Router();

const validateCredential = [
    body('username')
        .isLength({min: 6})
        .withMessage('아이디는 최소 6글자 입니다.'),
    body('password')
        .isLength({min: 6})
        .withMessage('비밀번호는 최소 6글지 압니다.')
];

const validateSignUp = [
    ...validateCredential,
    body('name')
        .isLength({min: 1, max: 161})
        .withMessage('이름 형식이 잘못되었습니다.(1~161글자)'),
    body('age')
        .notEmpty()
        .withMessage('나이를 입력해주세요'),
    body('height')
        .notEmpty()
        .withMessage('키를 입력해주세요'),
    body('weight')
        .notEmpty()
        .withMessage('몸무게를 입력해주세요')
];

router.post('/signup', [
    ...validateSignUp,
    Validate
], authController.SignUp);

router.post('/login', [
    ...validateCredential,
    Validate
], authController.Login);

router.post('/me', isAuth, authController.Me);

export default router;
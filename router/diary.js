import express from 'express';
import { query } from 'express-validator';
import * as diaryController from '../controller/diary.js';
import { GetAllWorkout } from '../middleware/wolist.js';
import { IsAuth } from '../middleware/auth.js';
import { Validate } from '../middleware/validate.js';

const router = express.Router();

// middleware/validate.js로 옮겨질 예졍
const minYear = 2000;
const maxYear = new Date().getFullYear();
const checkDate = (value, {req}) => {
    return value >= 1 && value <= new Date(req.query.year, req.query.month, -1).getDate();
}
const checkWorkout = (value) => {
    // custom validation 필요 없음 삭제
    console.log(typeof value);
    return true;
}
///////////////////////////////////////
const ValidateFullDate = [
    query('year')
    .notEmpty()
    .withMessage('연도를 입력해주세요.')
    .isInt({min: minYear, max: maxYear})
    .withMessage(`검색 가능 연도는 ${minYear} ~ ${maxYear} 입니다.`),
    query('month')
    .notEmpty()
    .withMessage('월을 입력해주세요.')
    .isInt({min: 1, max: 12})
    .withMessage('유효한 월을 입력해주세요.'),
    query('date')
    .custom(checkDate)
    .withMessage('유효한 일을 입력해주세요.')
]

const ValidateWorkout = [
    query('id')
    .custom(checkWorkout)
    .withMessage('요청에 해당하는 운동 유형이 없습니다.')
]

router.get('/', IsAuth, [
    ...ValidateFullDate,
    Validate
], diaryController.GetByMonth);

router.get('/workout', IsAuth, [
    ...ValidateWorkout,
    Validate
], GetAllWorkout, diaryController.GetAllWorkout);

export default router;
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
    if(value === undefined) return true;
    return value >= 1 && value <= new Date(req.query.year, req.query.month, -1).getDate();
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

router.get('/', IsAuth, [
    ...ValidateFullDate,
    Validate
], diaryController.GetByDate);

router.get('/workout', IsAuth, GetAllWorkout
, diaryController.Index, diaryController.GetByWorkoutName);

export default router;
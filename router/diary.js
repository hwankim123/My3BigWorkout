import express from 'express';
import * as diaryController from '../controller/diary.js';
import { IsAuth } from '../middleware/auth.js';

const router = express.Router();

// query의 month값 1 ~ 12만 받도록

router.get('/', IsAuth, diaryController.GetByMonth);

export default router;
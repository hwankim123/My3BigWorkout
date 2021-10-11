import express from 'express';
import * as workoutController from '../controller/workout.js';
import {IsAuth} from '../middleware/auth.js';
import { GetAllWorkout } from '../middleware/wolist.js';

const router = express.Router();

router.get('/', IsAuth, GetAllWorkout, workoutController.GetAllByUserId);

router.post('/', IsAuth, workoutController.SaveDiary);

export default router;
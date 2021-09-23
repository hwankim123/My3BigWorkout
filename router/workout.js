import express from 'express';
import * as workoutController from '../controller/workout.js';
import {IsAuth} from '../middleware/auth.js';
// import {Validate} from '../middleware/validate.js';

const router = express.Router();

router.get('/', IsAuth, workoutController.GetAllById);

router.post('/', IsAuth, workoutController.SaveDiary);

export default router;
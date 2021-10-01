import express from 'express';
import {body} from 'express-validator';
import * as authController from '../controller/auth.js';
import {IsAuth} from '../middleware/auth.js';
import {Validate} from '../middleware/validate.js';
import * as manageController from '../controller/manage.js';

const router = express.Router();

router.post('/addworkout', manageController.AddWorkout);

export default router;
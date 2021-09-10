import express from 'express';
import {body} from 'express-validator';
import * as routineController from '../controller/routine.js';
import {IsAuth} from '../middleware/auth.js';
import {Validate} from '../middleware/validate.js';

const router = express.Router();

// validate 체크 - list가 있는 이상 custom validate가 필요할 듯
// 1. name : notempty
// 2. workouts : isList, element가 1개 이상

//일단은 router 단에서의 validate은 위에까지만.


const validateRoutine = [
    body('name').trim().notEmpty().withMessage('루틴 이름이 비었습니다.'),
    body('isShared').isBoolean().withMessage('Type Error. isShared 값은 Boolean이어야 합니다.'),
    body('workouts').isArray({min: 1}).withMessage('운동을 최소 하나 이상 추가해주세요.'),
    Validate
]

router.get('/', IsAuth, routineController.GetAllByUserId);

router.get('/:id', IsAuth, routineController.GetOneById);

router.post('/', validateRoutine, IsAuth, routineController.Create);

router.put('/:id', validateRoutine, IsAuth, routineController.Update);

router.delete('/:id', IsAuth, routineController.Delete);

export default router;
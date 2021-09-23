import * as routineData from '../data/routine.js';

export async function GetAllByUserId(req, res) {
    const userId = req.userId;
    const data = await routineData.GetByUserId(userId);
    res
        .status(200)
        .json(data);
}

export async function GetOneById(req, res) {
    const id = parseInt(req.params.id);
    const data = await routineData.GetById(id);
    res
        .status(200)
        .json(data);
}

const kg_num_sets = "kg_num_sets";
const num_sets = "num_sets";
const num = "num";
const time = "time";
const jogging = "jogging";
const ERROR_ABOVE_ZERRO = '0 이상이어야 합니다.';

export async function Create(req, res) {
    const found = await routineData.GetByName(req.body.name);
    if (found) {
        console.log(
            `RoutineController.Create() : routine name already exist : ${req.body.name}`
        );
        return res
            .status(409)
            .json({message: '루틴 이름이 이미 존재합니다.'});
    }

    const workouts = req.body.workouts;
    const {index, message} = ValidateWorkouts(workouts);
    console.log(index, message);
    if (index) {
        return res
            .status(400)
            .json({index: index, message: message});
    }

    const newRoutine = {
        id: Date.now(),
        userId: req.userId,
        ...req.body
    };
    await routineData.Create(newRoutine);
    res
        .status(201)
        .json({message, data: newRoutine});
}

export async function Update(req, res) {
    const id = parseInt(req.params.id);
    const found = await routineData.GetById(id);
    if (!found) {
        return res
            .status(400)
            .json({message: '해당 루틴 id가 존재하지 않습니다.'});
    }

    const workouts = req.body.workouts;
    const {index, message} = ValidateWorkouts(workouts);
    if (index) {
        return res
            .status(400)
            .json({index: index, message: message});
    }

    const data = await routineData.UpdateById(id, req.body);
    res
        .status(200)
        .json({message, data});

}

export async function Delete(req, res) {
    const id = parseInt(req.params.id);
    const found = await routineData.GetById(id);
    if (!found) {
        return res
            .status(400)
            .json({message: '해당 루틴 id가 존재하지 않습니다.'});
    }
    await routineData.DeleteById(id);
    res.sendStatus(204);
}


// 내부 함수들

function ValidateWorkouts(workouts) {
    for (let i = 0; i < workouts.length; i++) {
        const workout = workouts[i];
        const type = workout.type;
        switch (type) {
            case kg_num_sets:
            case num_sets:
            case num:
                if (!CheckSets(type, workout.setList)) {
                    return {index: i, message: ERROR_ABOVE_ZERRO};
                }
                break;
            case time:
                if (workout.time <= 0) {
                    return {index: i, message: ERROR_ABOVE_ZERRO};
                }
                break;
            case jogging:
                if (workout.time <= 0) {
                    return {index: i, message: ERROR_ABOVE_ZERRO};
                }
                if (workout.km_per_h <= 0) {
                    return {index: i, message: ERROR_ABOVE_ZERRO};
                }
                break;
            default:
                return {index: i, message: '잘못된 운동 유형입니다.'};
        }
    }
    return {index: undefined, message: 'success'};
}

function CheckSets(type, sets) {
    if (sets.length === 0) {
        return false;
    }
    for (let i = 0; i < sets.length; i++) {
        switch (type) {
            case num:
                if (sets[i].num <= 0) 
                    return false;
                break;
            case num_sets:
                if (sets[i].sets <= 0) 
                    return false;
                break;
            case kg_num_sets:
                if (sets[i].kg <= 0) 
                    return false;
                break;
        }
    }
    return true;
}
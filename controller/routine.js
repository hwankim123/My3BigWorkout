import * as routineData from '../data/routine.js';

export async function GetAllByUserId(req, res) { // --> find 로 이름 바꾸기
    const userId = req.userId;
    const data = await routineData.FindByUserId(userId);
    res
        .status(200)
        .json(data);
}

export async function GetOneById(req, res) { // --> find 로 이름 바꾸기
    const data = await routineData.FindById(req.params.id);
    res
        .status(200)
        .json(data);
}

export async function Create(req, res) { 
    // 루틴 이름 중복 체크
    const found = await routineData.FindByName(req.userId, req.body.name);
    if (found) {
        console.log(
            `RoutineController.Create() : routine name already exist : ${req.body.name}`
        );
        return res
            .status(409)
            .json({message: '루틴 이름이 이미 존재합니다.'});
    }

    // 운동 종목들의 Object 형식 validate
    const workouts = req.body.workouts;
    const {index, message} = ValidateWorkouts(workouts);
    if (index >= 0) {
        return res
            .status(400)
            .json({index, message});
    }

    // Create
    const data = await routineData.Create(req.userId, req.body);
    res
        .status(201)
        .json({message, data});
}

export async function Update(req, res) {
    // 운동 종목들의 Object 형식 validate
    const workouts = req.body.workouts;
    const {index, message} = ValidateWorkouts(workouts);
    if (index >= 0) {
        return res
            .status(400)
            .json({index, message});
    }

    // Update with _id check
    const data = await routineData.UpdateById(req.params.id, req.body);
    if(data === null){
        return res
            .status(400)
            .json({message: '해당 루틴 id가 존재하지 않습니다.'});
    }
    res
        .status(200)
        .json({message, data});

}

export async function Delete(req, res) {
    // Delete with _id check
    const result = await routineData.DeleteById(req.params.id);
    if(result === null) {
        return res
            .status(404)
            .json({message: '해당 루틴 id가 존재하지 않습니다.'});      
    }
    res.sendStatus(204);
}

// res 200 with JSON : { req. body }
export async function Res(req, res){ 
    res.status(200).json(req.body);
}

// 내부 함수들
const ERROR_ABOVE_ZERRO = '0 이상이어야 합니다.';

function ValidateWorkouts(workouts) {
    for (let i = 0; i < workouts.length; i++) {
        const workout = workouts[i];
        const type = workout.type;
        switch (type) {
            case "default":
            case "맨몸운동":
                if (!CheckSets(type, workout.setList)) {
                    return {index: i, message: ERROR_ABOVE_ZERRO};
                }
                break;
            case "유산소":
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
    return {index: -1, message: 'success'};
}

function CheckSets(type, sets) {
    if (sets.length === 0) {
        return false;
    }
    for (let i = 0; i < sets.length; i++) {
        switch (type) {
            case "default":
                if (sets[i].num <= 0 || sets[i].sets <= 0 || sets[i].kg <= 0) 
                    return false;
                break;
            case "맨몸운동":
                if (sets[i].num <= 0 || sets[i].sets <= 0) 
                    return false;
                break;
        }
    }
    return true;
}
import * as routineData from '../data/routine.js';
import * as diaryData from '../data/diary.js';

export async function GetAllById(req, res){
    const userId = req.userId;
    const data = await routineData.GetByUserId(userId);
    res.status(200).json(data);
}

// TO-DO : Javascript의 시간 format에 호환되게 postman 및 data/workout.js 수정
// temporary time format : 'July 20, 21 00:20:18'
export async function SaveDiary(req, res){
    let body = req.body;
    body = {
        id: Date.now(),
        userId: req.userId,
        routineName: body.name,
        ...body
    };
    delete body.name;
    diaryData.Create(body);
    res.status(201).json({message: '운동 끝! 운동 일지가 작성되었습니다.'});
}
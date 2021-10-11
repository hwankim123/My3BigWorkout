import * as routineData from '../data/routine.js';
import * as diaryData from '../data/diary.js';

export async function GetAllByUserId(req, res){
    const routines = await routineData.FindByUserId(req.userId);
    req.body.routines = routines;
    res.status(200).json(req.body);
}

export async function SaveDiary(req, res){
    req.body = {
        ...req.body
    };
    diaryData.Create(req.userId, req.body);
    res.sendStatus(201);
}
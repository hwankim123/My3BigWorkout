import * as diaryData from '../data/diary.js';

export async function GetByDate(req, res){
    const year = !req.query.year ? new Date().getYear() : req.query.year;
    const month = !req.query.month ? new Date().getMonth() : req.query.month - 1;
    const date = !req.query.date ? 0 : req.query.date;
    const data = await diaryData.FindByDate(req.userId, parseInt(year), parseInt(month), parseInt(date));
    data.forEach((date) => {
        console.log(date.startAt.toString());
    })
    res.status(200).json(data);
}


export async function Res(req, res, next){
    if(!req.query.name){
        return res.status(200).json(req.body);
    }
    else{
        next();
    }
}

export async function GetByWorkoutName(req, res){
    const data = await diaryData.FindByWorkoutName(req.userId, req.query.name);
    res.status(200).json(data);
}
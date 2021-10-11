import * as diaryData from '../data/diary.js';

export async function GetByMonth(req, res){
    const year = !req.query.year ? new Date().getYear() : req.query.year;
    const month = !req.query.month ? new Date().getMonth() : req.query.month - 1;
    const date = !req.query.date ? 0 : req.query.date;
    const data = await diaryData.FindByDate(req.userId, parseInt(year), parseInt(month), parseInt(date));
    data.forEach((date) => {
        console.log(date.startAt.toString());
    })
    res.status(200).json(data);
}
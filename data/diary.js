import Mongoose from 'mongoose';
import { CreateRef_id, DeleteRef_id } from './auth.js';
import { ConvertId, SetVirtualId } from '../db/database.js';
import { config } from '../config.js';
const Schema = Mongoose.Schema;
const timezone = config.timezone;

const diarySchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    routineName: {type: String, required: true},
    startAt: {type: Date, required: true},
    endAt: {type: Date, required: true},
    workouts: {type: [Schema.Types.Mixed], required: true}
}, {timestamps: true});
SetVirtualId(diarySchema);
const Diary = Mongoose.model('Diary', diarySchema);

export async function FindByDate(userId, year, month, date){
    let set = {};
    if(!date){
        set = SetTime(year, month);
    } else{
        set = SetDate(year, month, date);
    }

    return Diary.find({
        userId: ConvertId(userId),
        startAt: {$gte: set.start, $lt: set.end} 
    }).sort({startAt: 1});
}

function SetTime(year, month){
    const monthStart = new Date(year, month, 1);
    
    year = (month + 1 == 12) ? year + 1 : year;
    const monthEnd = new Date(year, (month + 1) % 12, 1);

    return {start: monthStart, end: monthEnd};
}
function SetDate(year, month, date){
    const dateStart = new Date(year, month, date);

    const endDate = new Date(year, month + 1, 0);
    month = (date + 1 === endDate) ? month + 1 : month;
    year = (month  === 12) ? year + 1 : year;
    const dateEnd = new Date(year, month, (date + 1) % endDate);

    return {start: dateStart, end: dateEnd};
}

export async function Create(userId, newDiary){
    new Diary({
        userId: ConvertId(userId),
        ...newDiary
    }).save().then((diary) => {
        CreateRef_id(userId, diary._id, 'diaries');
    });
}

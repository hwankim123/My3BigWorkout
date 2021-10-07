import Mongoose from 'mongoose';
import * as authData from './auth.js';
import { ConvertId } from '../db/database.js';
const Schema = Mongoose.Schema;

const routineSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    isShared: {type: Boolean, required: true},
    workouts: {type: [Schema.Types.Mixed], required: true},
}, {timestamps: true});
const Routine = Mongoose.model('Routine', routineSchema);

export async function FindById(id) {
    return Routine.findById({_id: new Mongoose.Types.ObjectId(id)});
}

// 일단 default parameter로 한번 해봄. 
// 나아아중에 루틴 게시판 기능 추가할때 
// 루틴 이름으로 검색 기능 추가했을 때 userId 값은 안넘겨주는 식으로 활용하게
export async function FindByName(userId = undefined, name) {
    return Routine.findOne({userId, name});
}

export async function FindByUserId(userId) {
    return Routine.find({userId});
}

export async function Create(userId, newRoutine) {
    return new Routine({
        userId: new ConvertId(userId),
        ...newRoutine
    }).save().then((routine) => {
        authData.UpdateRoutine(routine.userId, routine._id);
        return routine;
    });

}

export async function UpdateById(id, routine) {
    return Routine.findByIdAndUpdate({
        _id: ConvertId(id)
    }, {
        name: routine.name,
        isShared: routine.isShared,
        workouts: routine.workouts
    }, {returnOriginal: false});
}

export async function DeleteById(id) {
    return Routine.findOneAndDelete({
        _id: ConvertId(id)
    }).then((routine) => {
        if(routine === null) return routine;
        return authData.DeleteRoutine(routine.userId, routine._id);
    });
}
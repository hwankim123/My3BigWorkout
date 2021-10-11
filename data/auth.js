import Mongoose from 'mongoose';
import { ConvertId } from '../db/database.js';
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    bench_1rm: {type: Number, default: 0},
    dead_1rm: {type: Number, default: 0},
    squat_1rm: {type: Number, default: 0},
    routines: [{type: Schema.Types.ObjectId, ref: 'Routine'}],
    diaries: [{type: Schema.Types.ObjectId, ref: 'Diary'}],
}, {timestamps: true});
const User = Mongoose.model('User', userSchema);

export async function Create(newUser){
    return new User(newUser).save().then(user => user.id);
}

export async function FindByUsername(username){
    return User.findOne({username});
}

export async function FindById(id){
    return User.findById({
        _id: ConvertId(id)
    });
}

function checkRef(ref_id, ref){
    switch(ref){
        case 'routines':
            return {routines: ref_id};
        case 'diaries':
            return {diaries: ref_id};
    }
}

export async function CreateRef_id(id, ref_id, ref){
    return User.updateOne({
        _id: ConvertId(id),
    }, {$push: checkRef(ref_id, ref)});
}

export async function DeleteRef_id(id, ref_id, ref){
    return User.updateOne({
        _id: ConvertId(id),
    }, {$pull: checkRef(ref_id, ref)});
}

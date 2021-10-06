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
}, {timestamps: true});
const User = Mongoose.model('User', userSchema);

export async function Create(user){
    return new User(user).save().then((u) => u.id);
}

export async function FindByUsername(username){
    return User.findOne({username});
}

export async function FindById(id){
    return User.findById({
        _id: ConvertId(id)
    });
}

export async function UpdateRoutine(id, routineId) {
    return User.updateOne({
        _id: ConvertId(id)
    }, {$push: {routines: routineId }});
}

export async function DeleteRoutine(id, routineId){
    return User.updateOne({
        _id: ConvertId(id),
    }, {$pull: {routines: routineId}});
}
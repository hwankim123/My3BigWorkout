import Mongoose from 'mongoose';
import { SetVirtualId } from '../db/database.js';

const wolistSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    workoutType: {type: String, required: true},
    agonist: {type: String}
});
SetVirtualId(wolistSchema);
const Wolist = Mongoose.model('Wolist', wolistSchema);

export async function Create(wolist){
    return new Wolist(wolist).save().then((wol) => wol);
}

export async function FindAll(){
    return Wolist.find();
}
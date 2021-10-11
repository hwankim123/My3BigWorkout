import Mongoose from 'mongoose';
import {config} from '../config.js';

export async function ConnectMongoose(){
    return Mongoose.connect(config.mongodb.host);
}

export function ConvertId(id){
    return new Mongoose.Types.ObjectId(id);
}

export function SetVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString();
    });
    schema.set('toObject', {virtuals: true});
    schema.set('toJSON', {virtuals: true});
}
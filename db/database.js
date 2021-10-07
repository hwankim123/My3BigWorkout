import Mongoose from 'mongoose';
import {config} from '../config.js';

export async function ConnectMongoose(){
    return Mongoose.connect(config.mongodb.host);
}

export function ConvertId(id){
    return new Mongoose.Types.ObjectId(id);
}
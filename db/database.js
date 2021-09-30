import MongoDB from 'mongodb';
import Mongoose from 'mongoose';
import {config} from '../config.js';

export async function ConnectMongoose(){
    return Mongoose.connect(config.mongodb.host);
}
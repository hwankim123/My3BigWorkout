import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as wolistData from '../data/wolist.js';
import {config} from '../config.js';

export async function AddWorkout(req, res){
    const workout = await wolistData.Create(req.body);
    console.log(workout);
    res.status(201).json(workout);
}
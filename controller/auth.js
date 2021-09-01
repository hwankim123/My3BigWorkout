import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userData from '../data/auth.js'; 

const bcryptSaltRounds = 12;
const expiresIn = '6h';
const secret = 'HG9Mi875dLFrPzmtwVUEAFRuImzivPVg';

export async function SignUp(req, res) {
    const {
        name,
        age,
        username,
        password,
        height,
        weight,
        bench_1rm,
        dead_1rm,
        squat_1rm
    } = req.body;
    let found = await userData.FindByUsername(username);
    if (found) {
        console.log('username already exist');
        return res
            .status(409)
            .json({message: '아이디가 이미 존재합니다.'});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const newUser = {
        id: Date
            .now()
            .toString(),
        name,
        age,
        username,
        password: hashed,
        height,
        weight,
        bench_1rm,
        dead_1rm,
        squat_1rm
    }
    userData.Create(newUser);
    const token = jwt.sign({
        id: newUser.id
    }, secret, {expiresIn: expiresIn});
    res
        .status(201)
        .json({token, username});
}
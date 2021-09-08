import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userData from '../data/auth.js'; 
import {config} from '../config.js'

const bcryptSaltRounds = config.bcrypt.saltRounds;
const expiresIn = config.jwt.expiresSec;
const secret = config.jwt.secretKey;

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
        console.error('/auth/signup: Error: username already exist');
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
    const token = createJWT(newUser.id);
    res
        .status(201)
        .json({token, username});
}

export async function Login(req, res){
    const {username, password} = req.body;
    let user = await userData.FindByUsername(username);
    let found = false;
    if(user){
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(isValidPassword){
            found = true;
        }
        else{
            console.error("/auth/login: Error: password wrong");
        }
    }
    else{
        console.error("/auth/login: Error: username wrong");
    }

    if(!found){
        return res.status(401).json({message: '아이디 혹은 비밀번호가 잘못되었습니다.'});
    }
    else{
        const token = createJWT(user.id);
        res.status(200).json({token, username});
    }
}

function createJWT(id){
    console.log('createdJWT(): JWT Created!');
    return jwt.sign({
        id
    }, secret, {expiresIn: expiresIn});
}

export async function Me(req, res){
    const user = await userData.FindById(req.userId); // 이미 isAuth 미들웨어에서 user를 찾는데 또찾는건 좀 비효율적일듯.
    if(!user){
        console.error('/auth/me(error):', user);
        return res.status(404).json({message: 'User Not Found'});
    }
    res.status(200).json({token: req.token, username: user.username});
}
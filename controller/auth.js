import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userData from '../data/auth.js';
import {config} from '../config.js';
const expiresIn = config.jwt.expiresSec;
const secret = config.jwt.secretKey;

export async function SignUp(req, res) {
    let body = req.body;

    // 아이디 중복 체크
    let found = await userData.FindByUsername(body.username);
    if (found) {
        console.error('/auth/signup: Error: username already exist');
        return res
            .status(409)
            .json({message: '아이디가 이미 존재합니다.'});
    }

    // 비밀번호 encoding, DB에 INSERT, JWT토큰 생성 후 username과 함께 res
    body.password = await bcrypt.hash(body.password, config.bcrypt.saltRounds);
    const id = await userData.Create(body);
    const token = createJWT(id);
    console.log('SignUp Success : ', id);
    res
        .status(201)
        .json({token, username: body.username});
}

export async function Login(req, res) {
    const {username, password} = req.body;

    // 아이디, 비밀번호 일치 확인
    let user = await userData.FindByUsername(username);
    let found = false;
    if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            found = true;
        } else {
            console.error("/auth/login: Error: password wrong");
        }
    } else {
        console.error("/auth/login: Error: username wrong");
    }

    // 일치 여부에 따라 res
    if (!found) {
        return res
            .status(401)
            .json({message: '아이디 혹은 비밀번호가 잘못되었습니다.'});
    } else {
        const token = createJWT(user.id);
        console.log("Login Success / userId : ", user.id);
        res
            .status(200)
            .json({token, username});
    }
}

export async function Me(req, res) {
    const user = await userData.FindById(req.userId);
    if (!user) {
        console.error('/auth/me(error):', user);
        return res
            .status(404)
            .json({message: 'User Not Found'});
    }
    res
        .status(200)
        .json({username: user.username});
}

function createJWT(id) {
    console.log('createdJWT(): JWT Created!');
    return jwt.sign({id}, secret, {expiresIn});
}
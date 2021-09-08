import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import authRouter from './router/auth.js';
import cors from 'cors';
import {config} from './config.js';

const app = express();
const port = config.host.port;

// 써드 파티 미들웨어
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// router 사용 선언
app.use('/auth', authRouter);

// 404
app.use((req, res) => {
    console.error('잘못된 경로. 404 Not Found');
    res.setStatus(404);
});

// 500. Server Error
app.use((error, req, res, next) => {
    console.error('async-error : ', error);
    res
        .send(500)
        .json({message: 'Server Error'});
});

// 서버 구동
app.listen(port, () => {
    console.log(`listening port : ${port}`);
});
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import {config} from './config.js';
import { ConnectMongoose } from './db/database.js';
import authRouter from './router/auth.js';
import routineRouter from './router/routine.js';
import workoutRouter from './router/workout.js';
import manageRouter from './router/manage.js';
import diaryRouter from './router/diary.js';

const app = express();

// 써드 파티 미들웨어
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// router 사용 선언
app.use('/auth', authRouter);
app.use('/routine', routineRouter);
app.use('/workout', workoutRouter);
app.use('/manage', manageRouter);
app.use('/diary', diaryRouter);

// 404
app.use((req, res) => {
    console.error('잘못된 경로. 404 Not Found');
    res.sendStatus(404);
});

// 500. Server Error
app.use((error, req, res, next) => {
    console.error('async-error : ', error);
    res
        .status(500)
        .json({message: 'Server Error'});
});

// MongoDB connect & 서버 구동
ConnectMongoose().then(() => {
    console.log('mongoose init');
    app.listen(config.host.port, () => {
        console.log(`listening port : ${config.host.port}`);
    });
});

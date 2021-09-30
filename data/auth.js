import Mongoose from 'mongoose';

let userData = [

];
// {
//     id: 1631194854811,
//     name: 'hwan',
//     age: 24,
//     username: 'hwankim123',
//     password: '$2b$12$CRYC1Nj9DpCPKOtBKOXtIeONJ/ZWOZ.L6O/2tDt/0FidYogcy0dma',
//     height: 183,
//     weight: 73,
//     bench_1rm: 40,
//     dead_1rm: 80,
//     squat_1rm: 20
// }
const userSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    bench_1rm: {type: Number, default: 0},
    dead_1rm: {type: Number, default: 0},
    squat_1rm: {type: Number, default: 0}
});

const User = Mongoose.model('User', userSchema);

export async function Create(user){
    const newUser = await new User(user).save();
    console.log("SignUp Success: ", newUser);
}

export async function FindByUsername(username){
    return userData.find(user => user.username === username);
}

export async function FindById(id){
    return userData.find(user => user.id === id);
}
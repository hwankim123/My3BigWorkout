import Mongoose from 'mongoose';

// Schema
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

// Model(Collection)
const User = Mongoose.model('User', userSchema);

export async function Create(user){
    return new User(user).save().then((data) => data.id);
}

export async function FindByUsername(username){
    return User.findOne({username}).exec();
}

export async function FindById(id){
    return User.findById(id);
}
import Mongoose from 'mongoose';

// Schema
const wolistSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    agonist: {type: String}
});

// Model(Collection)

const Wolist = Mongoose.model('Wolist', wolistSchema);

export async function Create(wolist){
    return new Wolist(wolist).save().then((wol) => wol);
}

export async function FindAll(){
    return Wolist.find();
}
import dotenv from 'dotenv';
dotenv.config();

function checkConfig(key, defaultValue = undefined){
    const value = process.env[key] || defaultValue;
    if(!value){
        const message = `Config Error : ${key} not initialized`;
        throw new Error(message);
    }
    return value;
}

export const config = {
    jwt: {
        // 노트북에는 .env 파일이 없어서 임시로 넣음!
        secretKey: checkConfig('JWT_SRCRET_KEY', 'HG9Mi875dLFrPzmtwVUEAFRuImzivPVg'),
        expiresSec: parseInt(checkConfig('JWT_EXPIRES_SEC', 21600)),
    },
    bcrypt: {
        saltRounds: parseInt(checkConfig('BCRYPT_SALT_ROUNDS', 12)),
    },
    host: {
        port: parseInt(checkConfig('HOST_PORT', 3000)),
    },
    mongodb: {
        // 노트북에는 .env 파일이 없어서 임시로 넣음!
        host: checkConfig('MONGODB_HOST', 'mongodb+srv://hwankim123_notebook_langstudycafe:cjsak123@cluster0.utxd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    },
    timezone: checkConfig('KOREA_TIMEZONE', 9),
};
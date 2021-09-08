import dotenv from 'dotenv';
dotenv.config();

function checkConfig(key, defaultValue = undefined){
    const value = process.env[key] || defaultValue;
    if(!value){
        const message = `Config Error : ${key} not initialized`;
        throw new Error(message);
    }
    console.log(`checkConfig(): ${key}: ${value}`);
    return value;
}

export const config = {
    jwt: {
        secretKey: checkConfig('JWT_SRCRET_KEY'),
        expiresSec: parseInt(checkConfig('JWT_EXPIRES_SEC', 21600)),
    },
    bcrypt: {
        saltRounds: parseInt(checkConfig('BCRYPT_SALT_ROUNDS', 12)),
    },
    host: {
        port: parseInt(checkConfig('HOST_PORT', 3000)),
    },
};
let userData = [
    {
        name: 'hwan',
        age: 24,
        username: 'hwankim123',
        password: '$2b$12$CRYC1Nj9DpCPKOtBKOXtIeONJ/ZWOZ.L6O/2tDt/0FidYogcy0dma',
        height: 183,
        weight: 73,
        bench_1rm: 40,
        dead_1rm: 80,
        squat_1rm: 20
    }
];

export async function FindByUsername(username){
    return userData.find(user => user.username === username);
}

export async function Create(user){
    userData = [
        user, ...userData
    ];
    console.log('SignUp Success : ', userData);
}
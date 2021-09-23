let routineData = [{
    "id": 1631194854811,
    "userId": 1631194854811,
    "name": "테스트",
    "isShared": false,
    "workouts": [
        {
            "type": "kg_num_sets",
            "name": "벤치프레스",
            "setList": [
                {
                    "kg": 30,
                    "num": 10,
                    "sets": 2,
                },
                {
                    "kg": 35,
                    "num": 8,
                    "sets": 2,
                },
                {
                    "kg": 40,
                    "num": 5,
                    "sets": 1,
                },
            ],
        },
        {
            "type": "num_sets",
            "name": "턱걸이",
            "setList": [
                {
                    "num": 10,
                    "sets": 2,
                },
                {
                    "num": 8,
                    "sets": 2,
                },
            ],
        },
        {
            "type": "num",
            "name": "아무 운동",
            "setList": [
                {
                    "num": 15,
                },
            ],
        },
        {
            "type": "time",
            "name": "플랭크",
            "time": 30,
        },
        {
            "type": "jogging",
            "name": "조깅",
            "time": 10,
            "km_per_h": 8.7,
        },
    ],
}];

export async function GetById(id){
    return routineData.find(routine => routine.id === id);
}

export async function GetByName(name){
    return routineData.find(routine => routine.name === name);
}

export async function GetByUserId(userId){
    return routineData.filter(routine => routine.userId === userId);
}

export async function Create(routine){
    routineData = [
        routine,
        ...routineData
    ];
    console.log('Create Routine Success: ', routineData.name);
}

export async function UpdateById(id, routine){
    let found = await GetById(id);
    if(found){
        found.isShared = routine.isShared;
        found.workouts = routine.workouts;
    }
    return found;
}

export async function DeleteById(id){
    routineData = routineData.filter(t => t.id !== id);
}

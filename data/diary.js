// TO-DO : Javascript의 시간 format에 호환되게 postman 및 data/workout.js 수정
let diaryData = [
    {
        "id": 1631194854811,
        "userId": 1631194854811,
        "routineName": "테스트",
        "startAt" : "Sep 23, 21 00:20:18",
        "duration" : "00:52:35",
        "workouts": [
            {
                "type": "kg_num_sets",
                "name": "벤치프레스",
                "setList": [
                    {
                        "kg": 30,
                        "num": 10,
                        "sets": 2
                    },
                    {
                        "kg": 35,
                        "num": 8,
                        "sets": 2
                    },
                    {
                        "kg": 40,
                        "num": 5,
                        "sets": 1
                    }
                ]
            },
            {
                "type": "num_sets",
                "name": "턱걸이",
                "setList": [
                    {
                        "num": 10,
                        "sets": 2
                    },
                    {
                        "num": 8,
                        "sets": 2
                    }
                ]
            },
            {
                "type": "num",
                "name": "아무 운동",
                "setList": [
                    {
                        "num": 4
                    }
                ]
            },
            {
                "type": "time",
                "name": "플랭크",
                "time": 30
            },
            {
                "type": "jogging",
                "name": "조깅",
                "time": 10,
                "km_per_h": 8.7
            }
        ]
    }
];

export async function Create(diary){
    diaryData = [
        diary,
        ...diaryData
    ];
    console.log('Diary Create Success: ', diaryData);
}
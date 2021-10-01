import * as wolistData from '../data/wolist.js';

export async function GetAll(req, res) {
    const data = await wolistData.FindAll();
    let result = {
        back: [],
        chest: [],
        lowerBody: [],
        shoulder: [],
        arm: [],
        fullBody: [],
        walkJogging: [],
    };
    console.log(result);
    data.forEach((workout) => {
        if(workout.type === "default"){
            switch(workout.agonist){
                case "등":
                    result.back.push(workout);
                    break;
                case "가슴":
                    result.chest.push(workout);
                    break;
                case "하체":
                    result.lowerBody.push(workout);
                    break;
                case "어깨":
                    result.shoulder.push(workout);
                    break;
                case "팔":
                    result.arm.push(workout);
                    break;
            }
        } else if(workout.type === "맨몸운동"){
            result.fullBody.push(workout);
        } else if(workout.type === "유산소"){
            result.walkJogging.push(workout);
        }
    });
    console.log(result);
    res
        .status(200)
        .json(result);
}
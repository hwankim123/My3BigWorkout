import { validationResult } from "express-validator";

export const Validate = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.error('Validation error : ', error);
        res
            .status(400)
            .json({message: error.array()});
    } else {
        console.log('Validation Passed');
        next();
    }
}

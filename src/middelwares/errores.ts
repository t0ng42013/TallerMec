import {Response, Request, NextFunction} from 'express';
import { Result, ValidationError, validationResult } from "express-validator";



export const errores = (req: Request, res: Response, next: NextFunction):void =>{

    const errors: Result<ValidationError> = validationResult(req);

    
    if(!errors.isEmpty()) {
        res.status(400).json(errors)
    } else {
        next();
    }
};
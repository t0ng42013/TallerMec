import jwt from 'jsonwebtoken';
import { IUser } from '../interface/IUser';

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY!

export const generateToken = (id :string) : Promise<string>=> {
    if(!JWT_SECRET_KEY){
        throw new Error ("JWT secret key");
    }

    return new Promise<string>((resolve, reject) => {
        jwt.sign({id},JWT_SECRET_KEY,{
                expiresIn:"1h"
            },(err, res) => {
                if(err) {
                    reject(err);
                }else{
                    resolve(res as string);
                }
            });
    });   
};
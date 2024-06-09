import {Request, Response} from 'express';
import { IUser } from '../interface/IUser';
import Usuario from '../models/user';
import randomstring from "randomstring";
import { send } from 'process';
import { comparePassword, hashPassword } from '../services/passwordServices';
import { generateToken } from '../services/authServices';


export const register = async (req:Request, res:Response):Promise<void> => {

    const {nombre, email, password}:IUser = req.body;

    const user = new Usuario({nombre, email, password});
    user.password = await hashPassword(password);

    const adminKey = req.headers["admin-key"];

    // if (adminKey===process.env.KEYFORADMIN) {
    //     usuario.rol=ROLES.admin;
    // }
    
    const newCode = randomstring.generate(6);
    user.code = newCode;
    await user.save();

    // await sendEmail(email,newCode)

    res.status(200).json({user});

};

export const login = async (req:Request, res:Response):Promise<void> =>{
    const {email, password}:IUser = req.body;

    try {
        const user = await Usuario.findOne({email});

        if (!user) {
            res.status(400).json({msg:"No se encontro ese email en la base de datos"})
            return;
        }
        
        const validPassword = await comparePassword(password, user.password)

        if (!validPassword) {
            res.status(400).json({msg:"Credenciales Incorrectas"})
            return;
        }

        const token = await generateToken(user.id);

        res.json({token, user});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Error en la base de datos"});
    }
}
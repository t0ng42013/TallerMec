export interface IUser{
    nombre: string;
    email: string;
    password: string;
    code?: string;
    verified?: boolean;
}
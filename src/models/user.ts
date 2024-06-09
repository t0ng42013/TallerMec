import { Schema,model,Model } from "mongoose";
import { IUser } from "../interface/IUser";

const UserSchema = new Schema<IUser>({
    nombre:{
        type: "string",
        required: [true,"El nombre es obligatorio schema"]
    },
    email:{
        type: "string",
        required: [true,"El email es obligatorio schema"]
    },
    password:{
        type: "string",
        required: [true,"El password es obligatorio schema"]
    },
    code: {
        type: "string",
    },
    verified:{
        type: "boolean",
        default: false 
    }

});

//Con este método podemos enviar la data al usuario filtrando lo que elijamos. En este caso, no le enviamos al usuario el __V, password, _id o el codigo.
UserSchema.methods.toJson = function(){
    const {__v,password,_id,code,...usuario}=this.toObject()
    return usuario
}

const Usuario:Model<IUser> = model<IUser>("Usuario",UserSchema);
export default Usuario;
import Usuario from "../models/user";
// import { sendEmail } from "../mailer/mailer"; 


export const registeredUser = async(email:string):Promise<void> => {
    const existingEmail = await Usuario.findOne({ email });

    if (existingEmail && existingEmail.verified) {
        throw new Error(`El correo ${email} ya está registro`);
    }
    //funcion para enviar email
    // if(existingEmail && !existingEmail.verified) {
	// 	await sendEmail(email,existingEmail.code as string)
	// 	throw new Error("El usuario ya está registrado. Se envió nuevamente el código.")
	//  }
    
};
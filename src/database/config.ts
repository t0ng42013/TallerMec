import mongoose from "mongoose";

export const dbConnection = async ():Promise<void> => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("Problemas con la connexion de la base de datos");
        }

        await mongoose.connect(dbURL);
        console.log("Connected to database")
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
};
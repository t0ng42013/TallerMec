import express, { Express } from "express";
import cors from "cors";
import { dbConnection } from "./src/database/config";
import authRoutes from "./src/routes/authRoutes";


//2 crear una clase de servidor
export class Server {
    private app:Express;
    private port:string | number| undefined;
    private authPath:string;
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;//3  Puerto predeterminado si no se especifica en las variables de entorno
        this.authPath = "/auth";

        this.middelwares();
        this.conectarDB();
        this.routes();

    }

    async conectarDB(): Promise<void> {
        await dbConnection();
    }

    //7 creacion de middelwares
    private middelwares():void{        
        this.app.use(express.json());
        this.app.use(cors());
    }

    //8 creacion de rutas
    private routes():void{
        this.app.use(this.authPath,authRoutes);
    }


    //4 funcion para iniciar el servidor
    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor inicializado en el puerto: ${this.port}`);
        });
    }
}
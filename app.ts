import dotenv from 'dotenv';
import { Server } from './server';

//1- Configurar variables de entorno
dotenv.config();

//5 Inicializar el servidor
const server = new Server();

//6 Iniciar el servidor
server.start();
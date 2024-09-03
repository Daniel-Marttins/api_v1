import express from "express";
import routes from './routes';
import cors from 'cors';
import { AppDataSource } from "./data-source";

const PORT = parseInt(process.env.PORT as string);
const HOST = process.env.BASE_URL || '127.0.0.1';

AppDataSource.initialize().then(() => {
    const app = express();
    
    app.use(express.json());

    app.use(cors());
    
    app.use(routes); 

    return app.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    });
});



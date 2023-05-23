import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routers';
import mongoose from 'mongoose';
import cors from 'cors'
import * as bodyParser from 'body-parser';

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 9000;
const url = process.env.ATLAS_URL as string

// Middlewares
app.use(cors())
app.use(bodyParser.json())

// Database
mongoose.connect(url, { autoIndex: true })
	.then(() => console.log('Database Connected!'))
	.catch((e) => console.log(e))

// Routers
app.use('/', router)

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
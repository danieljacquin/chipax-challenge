import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/apiRouter.js';
dotenv.config();

const app = express();
const port = 5000;

app.use('/',apiRouter);


app.listen(port, ()=>{
    console.log(`App running in port ${port}`);
})
import {} from 'dotenv/config';
import express from 'express';

import apiRouter from './routes/apiRouter.js';
const app = express();
const port = 5000;

app.use('/api',apiRouter);


app.listen(port, ()=>{
    console.log(`App running in port ${port}`);
})
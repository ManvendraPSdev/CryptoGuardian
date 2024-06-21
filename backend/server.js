import express from 'express' ;
import dotenv from 'dotenv' ;
import cors from 'cors' ;

import conectTOMongoDB from './DB/conectToMongoDB.js'
import mainRouter from './routes/main.routes.js';


dotenv.config() ;

const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;
app.use("/api/v1" , mainRouter) ;

const PORT = process.env.PORT || 8005 ;

app.listen(PORT , ()=>{
    conectTOMongoDB() ;
    console.log(`server is runnig on the PORT : ${PORT}`) ;
})

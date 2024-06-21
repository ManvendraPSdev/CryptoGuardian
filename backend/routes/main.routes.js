import express from 'express' ;
import router from './User_auth.routes';

const mainRouter = express.Router() ;

router.use("/auth" , router) ;

export default mainRouter ;
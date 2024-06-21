import express from 'express' ;
import { authMiddleware } from "../middleware";
import { getUserfromMongo } from '../controller/Fetch.user';

export const router = express.Router() ;
router.get("/" , authMiddleware , getUserfromMongo)
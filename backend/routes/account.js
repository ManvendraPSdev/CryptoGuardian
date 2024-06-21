import express from 'express' ;
import { authMiddleware } from '../middleware';
import Account from '../Models/user.model'
const router = express.Router() ;

router.get("/balance", authMiddleware , async (req, res)=>{
    const account = await Account.findOne({
        userId : req.userId 
    }) ;

    res.json({
        balance : account.balance
    })
    
})

router.post("/transfer" , authMiddleware , async(req , res)=>{
    const session = await  mongoose.startSession() ;
    session.startTransaction() ;
    const {amount , to} = req.body ;
    
    const account = await Account.findOne({userId : req.userId}).session(session) ;
    if(!account || account.balance < amount){
        await session.abortTransaction() ;
        return res.status(400).json({
            msg : "Insufficient Funds !!"
        })
    }

    const toAccount = await Account.findOne({userId : to}).session(session) ;
    if(!toAccount){
        await session.abortTransaction() ;
        return res.status(400).json({msg : "Invalid Account !!"})
    } 


    // Transfering Money 
    await Account.updateOne({userId : req.userId} , {$inc : {balance : -amount}}).session(session) ;
    await Account.updateOne({userId : req.to}, {$inc : {balance : amount}}.session(session));

    await session.comitTransaction() ;

    res.json({
        msg : "transaction Sucessfull !!"
    })
})

export default router ;
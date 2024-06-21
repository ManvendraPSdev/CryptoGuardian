import zod from 'zod' ;

import User from '../Models/user.model'; 
import { jwt } from 'jsonwebtoken';

const signupSchema = zod.object({
    userName : zod.string().email() ,
    firstName: zod.string() , 
    password : zod.string() ,
    confirmPassword : zod.string() ,
})

export const signup = async()=>{
    try {
        // const {email ,firstName , lastName , password , confirmPassword} = req.body ;
        // if(password != confirmPassword){
        //     return res.status(404).json({msg : "Invalid Password !"}) ;
        // }

        // Validation
        const sucess = signupSchema.safeParse(req.body) ;
        if(!sucess){
            return res.status(404).json({msg : "User already taken / Invalid inputs !"}) ;
        }

        
        // If password match 
        const user = await User.findOne({email : req.body.email}) ;

        if(user){
            return res.status(401).json({msg : "User Already Exists !!"}) ;
        }

        // if the user is new to the app 
        // const newUser = new User({   
        //     email ,
        //     firstName ,
        //     lastName ,
        //     password ,
        //     confirmPassword
        // })

        // Different way of using it 

        const newUser = await User.create({
            email : req.body.email ,
            firstName : req.body.firstName ,
            lastName : req.body.lastName ,
            password : req.body.password ,
            confirmPassword : req.body.confirmPassword
        })

        if(newUser){
            const token = jwt.sign({newUser_id : newUser._id} , process.env.JWT_SECRET)
            // Add the credentials to the data base 
            await newUser.save() ;

            res.status(201).json({
                message : "user created sucesfully" ,
                token : token ,
            })
           
        }
        else{
            res.status(404).json({msg : "Invalid User data !!"});
        }
    } catch (error) {
        console.log("Error in signup controller ", error.message) ;
        res.status(500).json({error : "Internal Server Error !! "})
    }
}

const signinSchema = zod.object({
    email : zod.string().email() ,
    password : zod.string() ,
    confirmPassword : zod.string() 
})

export const signin = async()=>{
    try {
        // const {email , password } = req.body ;
        // const user = await findOne({email}) ;
        // if(!email || !password){
        //     return res.status(404).json({msg : "Invalid fistName or the Password !!"}) ;
        // }

        const sucess = signinSchema.safeParse(req.body) ;
        if(!sucess){
            res.status(411).json({
                msg : "Invalid username or password"
            })
        }
        const user = await User.findOne({
            email : req.body.email,
            password : req.body.password
        })
        if(user){
            const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET) ;
            return res.status(201).json({
                token : token ,
            })
        }
    } catch (error) {
        console.log("Error in signin controller", error.message) ;
        res.status(500).json({error : "Internal server error"}) ;
    }
}
const generateJWT = (userId , res)=>{
    jwt.sign({userId : userId} , process.env.JWT_SECRET , {
        expiresIn : "10d"  ,
    })
}

export default generateJWT ;
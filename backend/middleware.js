import { jwt } from "jsonwebtoken"; 
export const authMiddleware = (req , res , next)=>{
    const authHeader = req.headers.authorization ; 
    if(!authHeader || !authHeader.startsWith('Barer')){
        return res.status(403).json({}) ;
    }
    const token = authHeader.split('')[1] ;
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ; 
        req.userId = decoded.userId ;
        next() ;
    } catch (error) {
        return res.status(403).json({}) ;
    }
}
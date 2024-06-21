import mongoose from 'mongoose' ;

const conectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI) ;
        console.log("MongoDB is Connected") ;
    } catch (error) {
        console.log("Erroe connecting in MongoDB",error.message) ;
    }
}

export default conectToMongoDB ;
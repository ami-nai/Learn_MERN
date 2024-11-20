import mongoose from "mongoose";

const connectToDB = async() =>{
    await mongoose.connect(process.env.uri).then((res) => {
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    })
};

export default connectToDB;
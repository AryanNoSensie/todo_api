import mongoose from "mongoose";

const connecttodb = async() => {
    await mongoose.connect(process.env.URL).then((res) =>{
        console.log("connected to db");
    })
}

export default connecttodb;


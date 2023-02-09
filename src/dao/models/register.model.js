import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-Paginate-v2'

const registerCollection = 'registro'

const registerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        unique: true,
    }, 
    age: Number,
    password: String,
    
})
registerSchema.plugin(mongoosePaginate);
export const registerModel = mongoose.model(registerCollection, registerSchema)
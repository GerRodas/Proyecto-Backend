import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-Paginate-v2'

const registerCollection = 'registro'

const registerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    
})
productSchema.plugin(mongoosePaginate);
export const registerModel = mongoose.model(registerCollection, registerSchema)
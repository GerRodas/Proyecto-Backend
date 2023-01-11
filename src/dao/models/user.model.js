import mongoose from "mongoose";

const usersCollection = 'usuarios'

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        unique: true,
    }    
})

export const usersModel = mongoose.model(usersCollection, usersSchema)
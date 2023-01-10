import mongoose from "mongoose";

const messagesCollection = 'mensajes'

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String,    
})

export const messagesModel = mongoose.model(messagesCollection, messagesSchema)
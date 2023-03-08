import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-Paginate-v2'
import { ProductManager } from "../Managers/ProductManager.js";

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    
    code: ProductManager.getNextId(),
    purchase_datetime: String,
    amout: Number,
    purchaser: String
    
    
})
ticketSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(ticketCollection, ticketSchema)
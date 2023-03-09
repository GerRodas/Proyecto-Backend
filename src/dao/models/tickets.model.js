import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-Paginate-v2'

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({    
    code: {
        type: String,
        unique: true,
        require: true,        
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amout: Number,
    purchaser: String   
    
})
ticketSchema.plugin(mongoosePaginate);
export const ticketsModel = mongoose.model(ticketCollection, ticketSchema)
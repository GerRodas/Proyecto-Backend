import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-Paginate-v2'

const productCollection = 'productos'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    price: Number,
    code: String,
    stock: Number,
    owner: {
        type: String
      }
    
})
productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema)
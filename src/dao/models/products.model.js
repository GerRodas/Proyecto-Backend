import mongoose, { mongo } from "mongoose";

const productCollection = 'productos'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    price: Number,
    code: String,
    stock: Number,
    
})

export const productModel = mongoose.model(productCollection, productSchema)
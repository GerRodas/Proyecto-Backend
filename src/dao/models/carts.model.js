import mongoose from "mongoose";

const cartCollection = 'carrito'

const cartSchema = new mongoose.Schema({
    product: Number,
    quantity: Number
})

export const cartModel = mongoose.model(cartCollection, cartSchema)
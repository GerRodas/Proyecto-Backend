import mongoose from "mongoose";

const cartCollection = 'carrito'

const cartSchema = new mongoose.Schema({
    cart: Number,
    product: Number,
    quantity: Number
})

export const cartModel = mongoose.model(cartCollection, cartSchema)
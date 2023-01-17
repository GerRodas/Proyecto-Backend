import mongoose from "mongoose";

const cartCollection = 'carrito'

const cartSchema = new mongoose.Schema({
    products: {        
          product: {
            type:[
              {
                product:{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "productos"
                }
              }
            ],
            default: []
          },
        },
        quantity: Number,
})

export const cartModel = mongoose.model(cartCollection, cartSchema)
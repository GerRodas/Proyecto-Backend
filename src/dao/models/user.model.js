import mongoose from "mongoose";
import moongosePaginate from "mongoose-paginate-v2";
import { cartModel } from "./carts.model.js";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        unique: true,
    },
    age: Number,
    password: String,
    cart: [
        {
          name:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "carrito"
          }
        }
      ],
    role: String,
    isPremium: {
      type: Boolean,
      default: false
}});

userSchema.plugin(moongosePaginate);
export const userModel = mongoose.model(userCollection, userSchema)
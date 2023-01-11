import { Router } from "express";
//import { ProductManager } from "../dao/Managers/ProductManager.js";
import { productModel } from "../dao/models/products.model.js";
import { messagesModel } from "../dao/models/messages.model.js";

//const manager = new ProductManager('./db/productos.json');
const router = Router();

router.get('/', async(req,res)=>{
    const products = await productModel.find().lean()
    res.render('index',{products});
});

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")
});

router.get("/chat", async (req,res)=>{
    const chat = await messagesModel.find().lean()
    res.render("chat",{chat})
});

export default router;
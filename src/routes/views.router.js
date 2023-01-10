import { Router } from "express";
import { ProductManager } from "../Managers/ProductManager.js";

const manager = new ProductManager('./db/productos.json');
const router = Router();

router.get('/', async(req,res)=>{
    const products = await manager.getproducts()
    res.render('index',{products});
});

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")
});

export default router;
import { Router } from "express";
import { CartManager } from "../Managers/CartManager.js";

const manager = new CartManager('./db/carrito.json');
const router = Router();

router.get('/', async (req,res)=>{

    const carts = await manager.getCart();

    res.send({carts})
})

router.get('/:id', async (req,res)=>{
    const id = parseInt(req.params.id)
    const cart = await manager.getCartById(id);

    res.json({cart})
})

router.post('/', async (req,res)=>{
    const newCart = await manager.getCart()
    carts.push(cart)

    res.json({status: "success", cart})

})

router.post('/:cid/product/:pid', async (req,res)=>{
    const cartID = parseInt(req.params.cid)
    const productID = parseInt(req.params.pid)
    
    const cart = await manager.addProductToCart(cartID, productID)

    res.json({status: "success", cart})

})

export default router;
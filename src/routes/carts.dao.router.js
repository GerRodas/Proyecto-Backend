import { Router } from "express";
import { cartModel } from "../dao/models/carts.model";

const router = Router();

router.get('/', async (req,res)=>{

    const carts = await cartModel.find();

    res.send({carts})
});

router.get('/:id', async (req,res)=>{
    const id = parseInt(req.params.id)
    const cart = await cartModel.findOne(id);

    res.json({cart})
});

router.post('/', async (req,res)=>{
    const cart = await cartModel.create()
    carts.push(cart)

    res.json({status: "success", cart})

});

router.post('/:cid/product/:pid', async (req,res)=>{
    const cartID = parseInt(req.params.cid)
    const productID = parseInt(req.params.pid)
    
    const cart = await cartModel.createCollection(cartID, productID)

    res.json({status: "success", cart})

});

router.delete('/:id', async (req,res)=>{
    const cart = await cartModel.deleteOne(id)

    res.json({status: "success", cart})

})

export default router;
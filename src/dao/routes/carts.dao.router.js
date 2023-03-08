import { Router } from "express";
import { cartModel } from "../dao/models/carts.model.js";

const router = Router();

router.get('/', async (req,res)=>{

    const carts = await cartModel.find();

    res.send({carts})
});

router.get('/:id', async (req,res)=>{

    try {
        const id = parseInt(req.params.id)
        const cart = await cartModel.findOne(id);
    
        res.json({success: true, result: cart})
        
    } catch (error) {
        res.send({success: false, result: error})

    }
});

router.post('/', async (req,res)=>{
    const cart = req.body
    const SavedCart = await cartModel.create(cart)
    

    res.json({status: "success", SavedCart})

});

router.post('/:cid/product/:pid', async (req,res)=>{
    try {
        const cartID = parseInt(req.params.cid)
        const productID = parseInt(req.params.pid)
        
        const cart = await cartModel.insertOne(cartID, productID)
    
        res.json({success: true, cart})
        
    } catch (error) {
        res.json({success: false, error})
    }

});

router.delete('/:id', async (req,res)=>{
    const cart = await cartModel.deleteOne(id)

    res.json({status: "success", cart})

})

export default router;
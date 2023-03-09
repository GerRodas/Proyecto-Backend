import { Router } from "express";
import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";

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

router.post('/:cid/purchase', async (req, res) => {
    try {
      const cart = await cartModel.findById(req.params.cid);
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      const products = cart.products;
      const purchases = [];
      for (const product of products) {
        const dbProduct = await productModel.findById(product.product_id);
        if (!dbProduct) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        if (dbProduct.stock < product.quantity) {
          return res.status(400).json({ error: 'Stock insuficiente para el producto: ' + dbProduct.title });
        }
        dbProduct.stock -= product.quantity;
        await dbProduct.save();
        purchases.push({
          product_id: dbProduct._id,
          quantity: product.quantity
        });
      }
  
      cart.status = 'Purchased';
      cart.purchases = purchases;
      await cart.save();
  
      res.json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al finalizar la compra' });
    }
  });

export default router;
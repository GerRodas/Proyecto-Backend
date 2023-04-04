import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../models/products.model.js";

const router = Router();

router.get('/', async (req,res)=>{
    
    try {
        const limit = req.query?.limit || 10
        const page = req.query?.page || 1

        const filter = req.query?.query || req.body?.query || ""

        const search = {}
        if (filter) {
            search ["$or"] = [
                {title: {$regex: filter}},
                {description: {$regex: filter}}
            ]
        }

        const options = {page, limit, lean: true}
    
        const result = await productModel.paginate(search, options);
       
    
        res.render('index',{result, query: filter});
    
        } catch (error) {
            console.log(error)
    
            res.render({success: false, error: "Se ha producido un error"});
        }

});
/*
router.get('/:producto', async (req,res)=>{

    try {
        const producto = req.params.producto;
        
        const product = await productModel.findById({title: producto}).lean().exec();

        if(!product){
            return res.send({success: false, error: "El producto no fue encontrado"})
        }

        res.send({success: true, product});
    
    } catch (error) {
        console.log(error)

        res.send({success: false, error: "Ha ocurrido un errorrrr"});
    }

});*/

router.post("/crear", async (req, res) => {
    try {
        const productNew = req.body

        const savedProduct = new productModel(productNew);
        await savedProduct.save();

        res.redirect('unProducto', {savedProduct: savedProduct})

    } catch (error) {
        console.log(error);

        
        res.render({success: false, error: "Alguito que pasó" + error});
    }
}
);

router.put('/:id', async(req,res) =>{
    try {
        const { id: paramId } = req.params;
        const id = String(paramId);

        if(!id) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        };

        const {title, description, thumbnail, price, code, stock} = req.body

        const updateProduct = await productModel.updateOne(id, {
            title,
            description,
            thumbnail,
            price,
            code,
            stock,
        });

        res.send({success: true, product: updateProduct});
        
    } catch (error) {
        console.log(error);

        if(error.name === ERRORS.NOT_FOUND_ERROR){
            return res.send({success: false, error: `${error.name}: ${error.message}`})
        }

        res.send({success: false, error: "Ha ocurrido un error"});
    }
});

router.delete('/delete/:id', async(req, res)=>{
    try {
        const deleteProduct = async (req, res) => {
            try {
              const productId = req.params.id;
              const product = await productModel.findById(productId);
          
              if (!product) {
                return res.status(404).json({ message: 'Product not found' });
              }
          
              const user = req.user; // usuario autenticado
          
              // si el usuario es premium y el producto es de su propiedad, puede eliminarlo
              if (user.isPremium && product.owner === user.email) {
                await product.remove();
                return res.status(200).json({ message: 'Product deleted successfully' });
              }
          
              // si el usuario es admin, puede eliminar cualquier producto
              if (user.role === 'admin') {
                await product.remove();
                return res.status(200).json({ message: 'Product deleted successfully' });
              }
          
              return res.status(403).json({ message: 'You are not authorized to delete this product' });
            } catch (error) {
              console.log(error);
              return res.status(500).json({ message: 'Internal server error' });
            }
          };


    } catch (error) {
        console.log(error)
        
        res.send({success: false, error: "Ha ocurrido un error"});
        
    }

})

export default router;
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

router.get('/delete/:id', async(req, res)=>{
    try {
        //const { id: paramId } = req.params;
        const id = new mongoose.Types.ObjectId(req.params.id);

        const deleted = await productModel.deleteOne({_id:id})

        const deletedProduct = await productModel.deleteOne(id)

        res.redirect('/index')


    } catch (error) {
        console.log(error)
        
        res.send({success: false, error: "Ha ocurrido un error"});
        
    }

})

export default router;
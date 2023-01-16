import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";

const router = Router();

router.get('/', async (req,res)=>{
    
    try {
        const { limit } = req.query
    
        const allProducts = await productModel.find();
    
        if(!limit || limit <1 ){
            return res.send({success: true, products: allProducts});
        }
    
        const products = allProducts.slice(0, limit);
    
        return res.send({success: true, products});
    
        } catch (error) {
            console.log(error)
    
            res.send({success: false, error: "Se ha producido un error"});
        }

});

router.get('/:id', async (req,res)=>{

    try {
        const { id: paramId } = req.params;
        const id = String(paramId)
        
        const product = await productModel.findById(id);

        if(!product.id){
            return res.send({success: false, error: "El producto no fue encontrado"})
        }

        res.send({success: true, product});
    
    } catch (error) {
        console.log(error)

        res.send({success: false, error: "Ha ocurrido un error"});
    }

});

router.post("/", async (req, res) => {
    try {
        const {title, description, thumbnail, price, code, stock, category, status} = req.body

        if(!title || !description || !price || !code || !stock || !status ||!category){
            return res.send({success: false, error: "Las variables son obligatorias"});

        }

        const savedProduct = await productModel.create({
            title,
            description,
            thumbnail,
            price,
            code,
            stock,
            category,
            status: true,
        });

        res.send({success: true, product: savedProduct})

    } catch (error) {
        console.log(error);

        
        res.send({success: false, error: "Ha ocurrido un error"});
    }
}
);

router.put('/:id', async(req,res) =>{
    try {
        const { id: paramId } = req.params;
        const id = Number(paramId);

        if(Number.isNaN(id) || id < 0) {
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

router.delete('/:id', async(req, res)=>{
    try {
        //const { id: paramId } = req.params;
        const id = req.params;

       

        const deletedProduct = await productModel.deleteOne(id)

        res.send({success: true, deleted: deletedProduct})


    } catch (error) {
        console.log(error)
        
        res.send({success: false, error: "Ha ocurrido un error"});
        
    }

})

export default router;
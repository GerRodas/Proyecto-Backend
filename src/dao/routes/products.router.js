import { Router } from "express";
import { ProductManager } from "../Managers/ProductManager.js";


const manager = new ProductManager('./db/productos.json');
const router = Router();

router.get('/', async (req,res)=>{
    
    try {
        const { limit } = req.query
    
        const allProducts = await manager.getproducts();
    
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
        const id = Number(paramId)

        if(Number.isNaN(id) || id < 0) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        }
        const product = await manager.getProductById(id);

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

        const savedProduct = await manager.addProduct({
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

        const updateProduct = await manager.updateProduct(id, {
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
        const { id: paramId } = req.params;
        const id = Number(paramId);

        if(Number.isNaN(id) || id < 0) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        };

        const deletedProduct = await manager.deleteProduct(id)

        res.send({success: true, deleted: deletedProduct})


    } catch (error) {
        console.log(error)

        if(error.name === ERRORS.NOT_FOUND_ERROR){
            return res.send({success: false, error: `${error.name}: ${error.message}`})
        }
        
        res.send({success: false, error: "Ha ocurrido un error"});
        
    }

})

export default router;
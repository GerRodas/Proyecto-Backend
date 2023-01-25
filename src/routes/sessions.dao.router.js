import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../dao/models/products.model.js";
import { usersModel } from "../dao/models/user.model.js";

const router = Router();

router.get('/register', async (req,res)=>{
    res.render('registrar',{})

});

router.post("/crear", async (req, res) => {
    try {
        const userNew = req.body

        const user = new usersModel(userNew);
        await user.save();

        res.redirect('/', {savedProduct: savedProduct})

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
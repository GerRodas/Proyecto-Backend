import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.get('/', async(req,res)=>{
    try{
        let users = await userModel.find()
        res.send({result:"success", payload: users})
    }
    catch(error){
        console.log("No se puede acceder al usuario con mongoose:" + error)
    }
});

router.get('/:id', async (req,res)=>{

    try {
        const { id: paramId } = req.params;
        const id = Number(paramId)

        if(Number.isNaN(id) || id < 0) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        }
        const product = await userModel.findById(id);

        if(!product.id){
            return res.send({success: false, error: "El usuario no fue encontrado"})
        }

        res.send({success: true, product});
    
    } catch (error) {
        console.log(error)

        res.send({success: false, error: "Ha ocurrido un error"});
    }

});

router.post("/", async (req, res) => {
    try {
        const {first_name, last_name, email} = req.body

        if(!first_name || !last_name || !email){
            return res.send({success: false, error: "Las datos son obligatorios"});

        }

        const savedProduct = await userModel.create({
            first_name,
            last_name,
            email,
            
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

        const {first_name, last_name, email} = req.body

        const updateProduct = await userModel.updateOne(id, {
            first_name,
            last_name,
            email,
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

        const deletedProduct = await userModel.deleteOne(id)

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
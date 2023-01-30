import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../dao/models/products.model.js";
import { registerModel } from "../dao/models/register.model.js";
import { usersModel } from "../dao/models/user.model.js";

const router = Router();

router.get('/register', async (req,res)=>{
    res.render('registrar',{})

});

router.post("/register", async (req, res) => {
    try {
        const userNew = req.body

        const user = new usersModel(userNew);
        await user.save();

        res.redirect('/', {newUser: user})

    } catch (error) {
        console.log(error);

        
        res.render({success: false, error: "Alguito que pasó" + error});
    }
}
);

router.get('/login',async(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
    const {email , password} = req.body
    const user = await registerModel.findOne(email, password).lean().exec()
    if(!user){
        res.status(401).render('errors/error', {error: 'Error en el email o password'})
    }
    req.session.user = user

    res.redirect('/')
})

export default router;
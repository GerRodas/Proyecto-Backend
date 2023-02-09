import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../dao/models/products.model.js";
import { registerModel } from "../dao/models/register.model.js";
import { usersModel } from "../dao/models/user.model.js";
import { Session } from "express-session";
import { createHash, isValidPassword } from "../utils.js";


const router = Router();

router.get('/register', async (req,res)=>{
    res.render('registrar',{})

});

router.post("/register", async (req, res) => {
    try {
        const userNew = req.body
        userNew.password = createHash(userNew.password)

        const user = new registerModel(userNew);
        await user.save();

        res.redirect('login')

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
    const user = await registerModel.findOne({email, password}).lean().exec()
    console.log(user);
    if(!user){
        res.status(401).render('errors/base', {error: 'Error en el email o password'})
    }
    if (!isValidPassword(user,password)){
        return res.status(403).send('Password incorrecto')
    }
    console.log({'elemento que recibo': user});
    req.session.user = user //No funciona el user, ni idea porque

    res.redirect('/products')
})

router.get('/logout',async(req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).render('errors/base', {error: err})

        res.redirect('login')
    })
})

export default router;
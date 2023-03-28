import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../models/products.model.js";
import { registerModel } from "../models/register.model.js";
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";
import passport from "passport";



const router = Router();

router.get('/register', async (req,res)=>{
    res.render('registrar',{})

});

router.post("/register", passport.authenticate('register',{failureRedirect: '/errors/base'}), (req, res) => {

    res.redirect('/session/login')
});

router.get('/login',async(req,res)=>{
    res.render('login')
})

router.post('/login',passport.authenticate('login',{failureRedirect: '/errors/base'}), (req, res)=>{
        
    if(!req.user){
        return res.status(400).render('/errors/base', {error: 'Error en el email. No hay usuario'})
    }
    console.log(req.session.user);
    req.session.user = req.user //No funciona el user, ni idea porque

    res.redirect('/products')
})

router.get('/logout',async(req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).render('errors/base', {error: err})

        res.redirect('login')
    })
})

router.get('/error',async(req,res)=>{
    return res.status(500).render('/errors/base', {error: err})
})

export default router;
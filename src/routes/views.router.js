import { Router } from "express";
//import { ProductManager } from "../dao/Managers/ProductManager.js";
import { productModel } from "../dao/models/products.model.js";
import { messagesModel } from "../dao/models/messages.model.js";
import { cartModel } from "../dao/models/carts.model.js";
import { usersModel } from "../dao/models/user.model.js";

//const manager = new ProductManager('./db/productos.json');
const router = Router();

router.get('/', async(req,res)=>{
    const products = await productModel.find().lean()
    res.render('index',{products});
});

router.get('/crear', async (req, res) => {
    res.render('crear', {})
});

router.post('/crear', async (req, res) => {
    res.render('crear', {})
});

router.get('/unproducto', async (req, res) => {
    res.render('unProducto', {})
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")
});

router.get("/chat", async (req,res)=>{
    const chat = await messagesModel.find().lean()
    res.render("chat",{chat})
});

router.get("/carts", async (req,res)=>{
    const chat = await cartModel.find().lean()
    res.render("carts",{})
});
/*
router.get('/registrar', async (req, res) => {
    res.render('registrar', {})
});

router.get('/registrar', async (req, res) => {
    const {email, password} = req.body

    const user = await usersModel.findOne({email, password})
    if(!user){
        res.status(401).render('errors/base', {error: 'Error en email o password'})
    }

    req.session.user = user
    res.render('index', {})
});*/

export default router;
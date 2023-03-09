import { Router } from "express";
import passport from "passport";
import { generateToken, authToken } from "/Users/German/Desktop/Proyecto-Backend/src/utils.js";

const router = Router();

router.get('/register', async (req,res)=>{
    res.render('registrar',{})

});

const users = []
router.post("/register", (req, res) => {

    const user = req.body

    if (users.find(u=> u.email ===user.email)){
        return res.status(400).render('errors/base',{Error: 'usuario ya existe'})
    }

    users.push(user)

    const access_token = generateToken(user)

    res.send({status: 'success', access_token})
});

router.get('/login',async(req,res)=>{
    res.render('login')
})

router.post('/login', (req,res) => {
    const {email, password} = req.body
    const user = users.find(u => u.email == email && u.password == password)
    if (!user) return res.status(400).render('errors/base', {Error: 'credenciales invalidas'})

    const access_token = generateToken(user)
    res.send({status: 'success', access_token})

})

router.get('/current', authToken,(req,res)=>{
    res.send({status: 'success', payload: req.user})
})

export default router;
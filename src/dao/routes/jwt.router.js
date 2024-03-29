import { Router } from "express";
import { generateToken, authToken } from "../../utils.js";

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

    res.render('login')
});

router.get('/login',async(req,res)=>{
    res.render('login')
})

router.post('/login', (req,res) => {
    const {email, password} = req.body
    const user = users.find(u => u.email == email && u.password == password)
    if (!user) return res.status(400).render('errors/base', {Error: 'credenciales invalidas'})

    const access_token = generateToken(user)
    res.render('index')

})

router.get('/current', authToken,(req,res)=>{
    res.send({status: 'success', payload: req.user})
})

export default router;
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';

const PRIVATE_KEY= "Papinaeslamejor"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
};

export const generateToken = (user) =>{
    const token = Jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

export const authToken = (req,res,next)=>{
    const authHeader = req.headers.auth
    if(!authHeader){
        return res.status(401).send({
            error: "No está autorizado"
        })
    }
    const token = authHeader.split(' ')[1]
    Jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        if(error) return res.status(403).send({error: "No autorizado"})

        req.user = credentials.user
        next()
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
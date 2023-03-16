import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

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

faker.locale = 'es'

export const generateProduct = () =>{
    let numofProducts = parseInt(faker.random.numeric(1,{bannedDigits:['0']}))
    let products = [];
    for (let i = 0; i < numofProducts; i++) {
        products.push(generateProduct());
        
    }
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        thumbnail: faker.image.food(),
        price: faker.commerce.price(100, 200, 0, '$'),
        stock: faker.random.numeric(1)
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
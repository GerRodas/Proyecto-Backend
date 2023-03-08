import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../src/utils.js';
import viewsRouter from './dao/views.router.js'
import productsdaoRouter from './dao/routes/products.dao.router.js';
import cartsdaoRouter from './dao/routes/carts.dao.router.js';
import usersdaoRouter from './dao/routes/users.dao.router.js';
import sessionRouter from './routes/sessions.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import { messagesModel } from './dao/models/messages.model.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
//import passport from 'passport';
import initializePassport from './config/passport.config.js';
import jwtRouter from './routes/jwt.router.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');


app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));


app.use('/',viewsRouter);

app.use('/products', auth, productsdaoRouter);
app.use('/carts', cartsdaoRouter);
app.use('/users', usersdaoRouter);
//app.use('/session', sessionRouter);
app.use('/jwt', jwtRouter);

const httpServer = app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"));

const io = new Server(httpServer);

io.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado en socket id:${socket.id}`)
    
    socket.on('message', data=>{
        console.log(data);
        messages.push(data);
        io.emit('messageLogs', messages)
    })

    })

const dataBaseOnLine = 'mongodb+srv://german:1122334455@ecommerce.nvhqyay.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dataBaseOnLine, (error)=>{
    if(error){
        console.log("No se pude conectar a la BD"+ error);
        process.exit()
    }
    console.log("Conectado a la BD");
})

app.use(cookieParser());

app.get('/setcookie', (req,res)=>{
    res.cookie('cookie', 'Bienvenido a la cookie de Papina').send('cookie seteada')
});
function auth(req,res,next){    
    if(req.session?.user) return next() 
    return res.status(401).render('errors/base', {Error: "No autenticado"})
}
/*

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
    store: MongoStore.create({
        mongoUrl: dataBaseOnLine,
        dbName: 'sessions',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 3000
    }),
    secret: 'milugarsecreto',
    resave: true,
    saveUninitialized: true
}))
*/


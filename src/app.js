import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../src/utils.js';
import viewsRouter from './routes/views.router.js'
import productsdaoRouter from './routes/products.dao.router.js';
import cartsdaoRouter from './routes/carts.dao.router.js';
import usersdaoRouter from './routes/users.dao.router.js';
import sessionRouter from './routes/sessions.dao.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import { messagesModel } from './dao/models/messages.model.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import  FileStore  from 'session-file-store';
import MongoStore from 'connect-mongo';

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
app.use('/logearse', sessionRouter);

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


app.use(session({
    store: MongoStore.create({
        mongoUrl: dataBaseOnLine,
        dbName: 'sessions',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 15
    }),
    secret: '123456',
    resave: true,
    saveUninitialized: true
}))

function auth(req,res,next){
    try {
        if(req.session?.user) return next()
        
    } catch (error) {
        return res.status(401).render('errors/base', {error: "No autenticado"})
        
    }

}
/*
app.get('/login', (req,res)=>{
    const { username } = req.query

    req.session.user = username
    res.send('Login success')
})

app.get('/logout', (req,res)=>{
    req.session.destroy(error =res.send(error))
})
app.get('/private', auth, (req,res)=> res.send('Private Page'))
*/
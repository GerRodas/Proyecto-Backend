import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../src/utils.js';
import viewsRouter from './routes/views.router.js'
import productsdaoRouter from './routes/products.dao.router.js';
import cartsdaoRouter from './routes/carts.dao.router.js';
import usersdaoRouter from './routes/users.dao.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');


app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));


app.use('/',viewsRouter);

app.use('/api/products', productsdaoRouter);
app.use('/api/carts', cartsdaoRouter);
app.use('/api/users', usersdaoRouter)

const httpServer = app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"));

const io = new Server(httpServer);

io.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado en socket id:${socket.id}`)
    
    io.sockets.emit()

    })

const dataBaseOnLine = 'mongodb+srv://german:1122334455@ecommerce.nvhqyay.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dataBaseOnLine, (error)=>{
    if(error){
        console.log("No se pude conectar a la BD"+ error);
        process.exit()
    }
    console.log("Conectado a la BD");
})
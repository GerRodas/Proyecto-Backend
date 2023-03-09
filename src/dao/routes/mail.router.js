import { Router } from "express";
import mongoose from "mongoose";
import nodemailer from 'nodemailer'

const router = Router();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'germanrodas@gmail.com',
        pass: 'wabpclkizqjudoam'
    }
})

app.get('/mail', async(req,res)=>{
    const result = await transport.sendMail({
        from: 'germanrodas@gmail.com',
        to: 'germanrodas@gmail.com', //poner el mail del usuario que va a ir
        subject: 'Ticket de compra',
        html: `
        <div>
            <h1>Detalles de compra</h1>
            <p>Producto: ${purchaseData.product}</p>
            <p>Cantidad: ${purchaseData.quantity}</p>
            <p>Total: ${purchaseData.total}</p>
        </div>
        `
    })
    console.log(result)
    res.send({status:"success", result:"Email enviado"})
})

export default router;
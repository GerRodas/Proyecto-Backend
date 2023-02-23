import dotenv from 'dotenv';

const environment = "PRODUCTION";
dotenv.config({
    pat:environment==="DEVELOPMENT"?'./.env.development':'./.env.production'
});


export default{
    port: process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}
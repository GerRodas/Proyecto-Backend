import passport from "passport";
import local from 'passport-local'
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {        
            passReqToCallback: true, usernameField: 'email'
        },
        async (req, username, password, done)=>{
            const {first_name, last_name, email} =req.body
        }
    ))}

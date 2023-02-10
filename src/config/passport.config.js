import passport from "passport";
import local from 'passport-local'
import { registerModel } from "../dao/models/register.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {        
            passReqToCallback: true, usernameField: 'email'
        },
        async (req, username, password, done)=>{
            const {first_name, last_name, email} =req.body
            try {
                const user = await registerModel.findOne({email: username})
                    if(user){
                        console.log('El usuario existe')
                        return done(null, false)
                    }
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        password: createHash(password)
                    }
                    const result = await registerModel.create(newUser)
                    return done(null, result)
            } catch (error) {
                return done("Error al registrar" + error)
            }
        }
    ))
        passport.serializeUser((user, done) =>{
            done(null, user._id)
        })
        passport.deserializeUser(async(id, done)=>{
            const user = await registerModel.findById(_id)
            done(null, user)
        })
    }

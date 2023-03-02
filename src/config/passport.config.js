import passport from "passport";
import local from 'passport-local'
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {        
            passReqToCallback: true, usernameField: 'email'
        },
        async (req, username, password, done)=>{
            try {
                const user = await userModel.findOne({email: username})
                    if(user){
                        console.log('El usuario existe')
                        return done(null, false)
                    }
                    const newUser = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        age: req.body.age,
                        role: 'user',
                        social: 'local',
                        password: createHash(password)
                    }
                    const result = await userModel.create(newUser)
                    return done(null, result)
            } catch (error) {
                return done("Error al registrar" + error)
            }
        }
    ))
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done)=>{
        try {
            const user = await userModel.findOne({email: username}).lean().exec()
            console.log({"lo que es el user":user});
            console.log({"lo que es el username":username});
            console.log({"lo que es el password":password});
            console.log({"lo que es el done":done});
            if(!user){
                console.log('Usuario no existe')
                return done(null, false)
            }
            if(!isValidPassword(user, password)) {
                return done(null, false)
            }
            console.log({"lo que es el segundo done":done});
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))
    passport.serializeUser((user, done) =>{
        done(null, user._id)
        })
    passport.deserializeUser(async(id, done)=>{
        const user = await userModel.findById(id)
        done(null, user)
        })
    }

export default initializePassport
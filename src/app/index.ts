import express from "express"
import { authRouter } from "./auth/route";
import { AuthMiddleware } from "./MiddleWare/auth-middleware";

export function createApplication(){
    const app = express()


    // middleware 
    app.use(express.json());
    app.use(AuthMiddleware());

    // routes 
    app.get('/' , (req , res )=>{
        return res.json({message : "welcome to server"})
    })

    app.use('/auth', authRouter)
    
    return app ; 
}
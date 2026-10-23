import express from "express"
import { authRouter } from "./auth/route";


export function createApplication(){
    const app = express()


    // middleware 
    app.use(express.json());

    // routes 
    app.get('/' , (req , res )=>{
        return res.json({message : "welcome to server"})
    })

    app.use('/auth', authRouter)
    
    return app ; 
}
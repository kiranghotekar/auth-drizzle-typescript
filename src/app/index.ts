import express from "express"

export function createApplication(){
    const app = express()


    // middleware 


    // routes 
    app.get('/' , (req , res )=>{
        return res.json({message : "welcome to server"})
    })

    return app ; 
}
import { Request, Response } from 'express'
import { signInPayloadModel, signupPayloadModel } from './model';
import { createHmac, randomBytes } from 'node:crypto'
import { usersTable } from '../../db/schema';
import { db } from '../../db';
import { eq } from 'drizzle-orm'

class authenticationController {

    public async handlesignup(req: Request, res: Response) {
        const validationResult = await signupPayloadModel.safeParseAsync(req.body)
        if (validationResult.error) return res.status(400).json({ message: "validation failed", error: validationResult.error.issues })

        const { name, age, email, password } = validationResult.data
        const useremailResult = await db.select().from(usersTable).where(eq(usersTable.email, email))
        if (useremailResult.length > 0) return res.status(400).json({ error: 'duplicate entry', message: `user with ${email} already exist` })

        const salt = randomBytes(32).toString('hex')
        const hash = createHmac('sha256', salt).update(password).digest('hex')

        const result = await db.insert(usersTable).values({
            name,
            age,
            email,
            password: hash,
            salt

        }).returning({ id : usersTable.id})
        return res.status(201).json({message : 'user has been created succesfully' , data : {id:result[0]?.id }})
    }


    public async handleSignin( req : Request , res : Response){

        const validateSignIn = await signInPayloadModel.safeParseAsync(req.body)
        if(validateSignIn.error) return res.status(400).json({message :"Sign in validation failed" , error : validateSignIn.error.issues})
        
        const { email , password} = validateSignIn.data
        
        const [ userSelectbyemail ] = await db.select().from(usersTable).where(eq(usersTable.email , email))
        if(!userSelectbyemail) return res.status(404).json({message : `user with ${email} does not exist `})
    
        const salt = userSelectbyemail.salt!
        const hash = createHmac('sha256' , salt).update(password).digest('hex')
        if(userSelectbyemail.password !== hash) return res.status(400).json({message : `email or password is incorrect`})
    
            // todo : token banao
            return res.json({message : 'sign-in succesful ' , data :{token : 1}})
    
        }
}

export default authenticationController; 
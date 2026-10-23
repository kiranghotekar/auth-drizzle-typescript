import express from 'express'
import {Router} from 'express'

import AuthenticationController from './controller'

const authenticationController = new AuthenticationController()

export const authRouter:Router = express.Router()


authRouter.post('/sign-up' , authenticationController.handlesignup.bind(authenticationController))
authRouter.post('/sign-in' , authenticationController.handleSignin.bind(authenticationController))
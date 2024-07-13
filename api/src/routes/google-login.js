import express from 'express'
import {GLoginController} from '../controllers/google-login.js'

const gLoginRouter = express.Router()

gLoginRouter.get('/login', GLoginController.login)

gLoginRouter.get('/callback', GLoginController.callback)

export default gLoginRouter
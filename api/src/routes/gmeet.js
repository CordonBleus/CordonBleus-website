import express from 'express'
import {GMeetController} from '../controllers/gmeet.js'

const gMeetRouter = express.Router()

gMeetRouter.get('/:roomName', GMeetController.getRoom)

gMeetRouter.post('/', GMeetController.createRoom)

export default gMeetRouter
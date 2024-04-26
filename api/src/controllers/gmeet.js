import {createRoom, getRoom} from '../services/gmeet.js'


export class GMeetController {
  static async createRoom(req, res) {
    const [roomName, meetingUri] = await createRoom(req.body)
    res.status(201).json({roomName, meetingUri})
  }

  static async getRoom(req, res) {
    const roomName = req.params.roomName
    const room = await getRoom(roomName)
    res.status(200).json(room)
  }
}
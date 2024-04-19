import {googleLogin} from '../services/google-login.js'


export class GLoginController {
  static async login(req, res) {
    const link = await googleLogin()
    res.status(200).json(link)
  }

  // static async callback(req, res) {
  //   await setGoogleToken()
  //   res.status(200)
  // }

}
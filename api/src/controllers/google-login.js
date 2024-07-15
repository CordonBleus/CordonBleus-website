import {googleLogin, setGoogleToken} from '../services/google-login.js'


export class GLoginController {
  static async login(req, res) {
    const link = await googleLogin()
    res.redirect(link)
  }

  static async callback(req, res) {
    const token = await setGoogleToken(req.query)
    res.redirect(`${process.env.FRONT_URI}/room-list?token=${btoa(token.refresh_token)}`)
  }
}
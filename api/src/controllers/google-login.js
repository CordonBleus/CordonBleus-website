import {googleLogin, setGoogleToken} from '../services/google-login.js'


export class GLoginController {
  static async login(req, res) {
    const link = await googleLogin()
    res.redirect(link)
  }

  static async callback(req, res) {
    const token = await setGoogleToken(req.query)
    console.log(token)
    res.redirect(`/room-list?token=${btoa(token.refresh_token)}`)
  }
}

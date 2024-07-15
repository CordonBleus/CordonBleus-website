import {OAuth2Client} from 'google-auth-library'
// import http from 'http'
// import url from 'url'
// Download your OAuth2 configuration from the Google
import keys from '../../data/credentials.json' with {type: "json"}

/**
 * Start by acquiring a pre-authenticated oAuth2 client.
 */
export async function googleLogin() {
  return await getAuthenticatedClientURI()
}

/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
function getAuthenticatedClientURI() {
  return new Promise((resolve) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/meetings.space.readonly',
        'https://www.googleapis.com/auth/meetings.space.created',
      ],
    });

    console.log('Authorize this app by visiting this url:', authorizeUrl)
    resolve(authorizeUrl)
  });
}


export async function setGoogleToken(query) {
  const oAuth2Client = await getAuthenticatedClient()
  const tokens = await oAuth2Client.getToken(query.code)
  oAuth2Client.setCredentials(tokens)
  // console.log(oAuth2Client)
  return {
    "type": "authorized_user",
    "client_id": keys.web.client_id,
    "client_secret": keys.web.client_secret,
    "refresh_token": tokens.tokens.refresh_token,
  }
  // return await oAuth2Client.getTokenInfo(tokens.tokens.access_token)
}

function getAuthenticatedClient() {
  return new Promise((resolve) => {
    const oAuth2Client = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    )
    resolve(oAuth2Client)
  })
}

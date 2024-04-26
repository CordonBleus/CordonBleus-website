import path from "node:path";

import {authenticate} from "@google-cloud/local-auth";

import {SpacesServiceClient} from "@google-apps/meet";

import {auth} from "google-auth-library";

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/meetings.space.created',
  'https://www.googleapis.com/auth/meetings.space.readonly',
];

const CREDENTIALS_PATH = path.join("data", 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadCredentials(credentials) {
  try {
    return auth.fromJSON(credentials);
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize(credentials) {
  let client = await loadCredentials(credentials);
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES, keyfilePath: CREDENTIALS_PATH,
  });
  return client;
}

/**
 * Creates a new meeting space.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function createSpace(authClient) {
  const meetClient = new SpacesServiceClient({
    authClient: authClient
  });
  // Construct request
  const request = {};

  // Run request
  const response = await meetClient.createSpace(request);
  return [response[0].name, response[0].meetingUri]
}


/**
 * get meeting space.
 * @param authClient
 * @param roomName
 */
async function getSpace(authClient, roomName) {
  const meetClient = new SpacesServiceClient({
    authClient: authClient
  })
  // Construct request
  const request = {
    name: roomName
  };

  // Run request
  return await meetClient.getSpace(request);
}


export async function createRoom(credentials) {
  const auth = await authorize(credentials);
  return await createSpace(auth);
}

export async function getRoom(credentials, roomName) {
  const auth = await authorize(credentials);
  return await getSpace(auth, roomName);
}
import {promises as fs} from "fs";

import path from "path";

import process from "process";

import {authenticate} from "@google-cloud/local-auth";

import {SpacesServiceClient} from "@google-apps/meet";

import {auth} from "google-auth-library";


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/meetings.space.created'];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// TODO: use local storage
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH); //TODO: read from local storage
        const credentials = JSON.parse(content);
        return auth.fromJSON(credentials);
    } catch (err) {
        console.log(err);
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload); // TODO: store in local storage
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
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
 * list meeting space.
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


export async function createRoom() {
    const auth = await authorize();
    return await createSpace(auth);
}

export async function getRoom(roomName) {
    const auth = await authorize();
    return await getSpace(auth, roomName);
}
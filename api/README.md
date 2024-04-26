# How to use API

## Google meet

### Login to google via oAuth2
use the endpoint ``/api/google/login`` (POST) to get redirected to google login page. \
After successful login, Google is going to redirect to the endpoint ``/api/google/callback``. \
The callback endpoint will redirect to the frontend with the token in the URL as Base64. \
frontend should decode the token and store it in the local storage.

### Create a meeting
use the endpoint ``/api/google/meet`` to create a meeting (POST). \
The endpoint requires the following parameters:
```json
{
  "type": "",
  "client_id": "",
  "client_secret": "",
  "refresh_token": ""
}
```
response is like : 
```json
{
  "roomName": "spaces/xxxxx",
  "meetingUri": "https://meet.google.com/xxx-xxx-xxx"
}
```

Only the account that created the meeting can join the meeting without asking permission to join.
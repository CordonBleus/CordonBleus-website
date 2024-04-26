import express from 'express';

import gMeetRouter from "./routes/gmeet"
import gLoginRouter from "./routes/google-login";

const app = express();

app.use(express.json());

app.use('/api/meet', gMeetRouter);
app.use('/api/google', gLoginRouter);

app.get('/', (_, res) => {
  res.send('Welcome to the API!');
})

if (import.meta.env.PROD) {
  app.listen(3000, () => {
    console.log('API ready !');
  });
}

// noinspection JSUnusedGlobalSymbols (Used by Vite)
export const viteNodeApp = app;

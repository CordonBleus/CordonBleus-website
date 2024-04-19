import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.send('Welcome to the API!');
})

if (import.meta.env.DEV) {
  app.listen(3000, () => {
    console.log('API ready !');
  });
}

// noinspection JSUnusedGlobalSymbols (Used by Vite)
export const viteNodeApp = app;

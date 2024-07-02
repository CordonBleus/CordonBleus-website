import express from "express";
import cors from "cors";
import {AppDataSource} from "./data-source.js";
import {getAllRecipes} from "./routes/recipes/all.js";
import {getSingleRecipe} from "./routes/recipes/single.js";
import {searchRecipes} from "./routes/recipes/search.js";

if (!AppDataSource.isInitialized) {
  await AppDataSource.initialize();
}

import gMeetRouter from "./routes/gmeet"
import gLoginRouter from "./routes/google-login";

const app = express();
app.use(express.json());
app.use(cors())

app.get("/recipes", getAllRecipes);
app.get("/recipes/search", searchRecipes);
app.get("/recipes/:id", getSingleRecipe);

app.use('/api/meet', gMeetRouter);
app.use('/api/google', gLoginRouter);

app.get('/', (_, res) => {
  res.send('Welcome to the API!');
})

if (import.meta.env.PROD) {
  app.listen(3000, () => {
    console.log("API ready !");
  });
}

// noinspection JSUnusedGlobalSymbols (Used by Vite)
export const viteNodeApp = app;

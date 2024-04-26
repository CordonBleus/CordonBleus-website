import express from "express";
import {AppDataSource} from "./data-source.js";
import {getAllRecipes} from "./routes/recipes/all.js";
import {getSingleRecipe} from "./routes/recipes/single.js";
import {searchRecipes} from "./routes/recipes/search.js";

if (!AppDataSource.isInitialized) {
  await AppDataSource.initialize();
}

const app = express();

app.get("/recipes", getAllRecipes);
app.get("/recipes/search", searchRecipes);
app.get("/recipes/:id", getSingleRecipe);

if (import.meta.env.PROD) {
  app.listen(3000, () => {
    console.log("API ready !");
  });
}

// noinspection JSUnusedGlobalSymbols (Used by Vite)
export const viteNodeApp = app;

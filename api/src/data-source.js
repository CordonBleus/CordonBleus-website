import {DataSource} from "typeorm";
import {User} from "./entity/User.js";
import {Ingredient} from "./entity/Ingredient.js";
import {Recipe} from "./entity/Recipe.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER ?? "root",
  password: process.env.POSTGRES_PASSWORD ?? "root",
  database: process.env.POSTGRES_DB ?? "cordon-bleus",
  synchronize: true,
  logging: process.env.NODE_ENV !== "production",
  entities: [
    User,
    Recipe,
    Ingredient,
  ],
});

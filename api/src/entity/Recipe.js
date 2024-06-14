import {EntitySchema} from "typeorm";
import {Ingredient} from "./Ingredient.js";

/**
 * @type {EntitySchema<IRecipe>}
 */
export const Recipe = new EntitySchema({
  name: "Recipe",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
      nullable: false,
    },
    imageUrl: {
      type: "text",
      nullable: false,
    },
    cookingTime: {
      type: "int",
      nullable: false,
    },
    prepTime: {
      type: "int",
      nullable: false,
    },
    steps: {
      type: "simple-json",
      nullable: false,
      default: [],
    },
  },
  relations: {
    ingredients: {
      target: Ingredient.options.name,
      type: "many-to-many",
      joinTable: true,
      cascade: true,
      default: [],
      eager: true,
    },
  },
});

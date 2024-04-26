import {EntitySchema} from "typeorm";

/**
 * @type {EntitySchema<IIngredient>}
 */
export const Ingredient = new EntitySchema({
  name: "Ingredient",
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
    quantity: {
      type: "text",
      nullable: false,
    },
    imageUrl: {
      type: "text",
      nullable: true,
    },
  },
});

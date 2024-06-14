import {EntitySchema} from "typeorm";

/**
 * @type {EntitySchema<IUser>}
 */
export const User = new EntitySchema({
  name: "User",
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
    email: {
      type: "text",
      nullable: false,
    },
    password: {
      type: "text",
      nullable: false,
    },
  },
});

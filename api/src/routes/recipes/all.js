import {AppDataSource} from "../../data-source.js";
import {Recipe} from "../../entity/Recipe.js";
import {PAGE_SIZE} from "../../R.js";
import {getRequestedFormat, parseIntOrDefault} from "../../utils.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 * @return {Promise<void>}
 */
export async function getAllRecipes(req, res) {
  const format = getRequestedFormat(req);
  const page = parseIntOrDefault(req.query["page"], 0);
  const recipesRepo = AppDataSource.getRepository(Recipe);

  const recipes = await recipesRepo.find({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
    relations: {
      ingredients: true,
    },
  });

  if (format === "json") {
    res.json(recipes);
  } else {
    res.send("NotImplemented");
  }
}

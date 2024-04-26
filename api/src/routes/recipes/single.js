import {parseIntOrDefault} from "../../utils.js";
import {AppDataSource} from "../../data-source.js";
import {Recipe} from "../../entity/Recipe.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 * @return {Promise<unknown>}
 */
export async function getSingleRecipe(req, res) {
  const recipeId = parseIntOrDefault(req.params["id"], NaN);
  const recipeRepo = AppDataSource.getRepository(Recipe);
  if (isNaN(recipeId) || !(await recipeRepo.existsBy({id: recipeId}))) {
    return res.status(404)
      .send({
        status: "error",
        code: "NotFound",
      });
  }
  res.json(await recipeRepo.findOneBy({id: recipeId}));
}

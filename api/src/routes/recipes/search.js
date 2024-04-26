import {AppDataSource} from "../../data-source.js";
import {Recipe} from "../../entity/Recipe.js";
import {PAGE_SIZE} from "../../R.js";
import {And, ILike} from "typeorm";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 * @return {Promise<unknown>}
 */
export async function searchRecipes(req, res) {
  const queryString = (req.query["q"] || "").trim();
  const query = queryString.split(" ")
    .filter((term) => term.length > 0);

  const recipeRepo = AppDataSource.getRepository(Recipe);

  if (queryString.length < 3 || query.length === 0) {
    return res.json({
      status: "error",
      message: "NoSearchQuery",
    });
  }

  const results = await recipeRepo.find({
    take: PAGE_SIZE,
    loadEagerRelations: false,
    where: {
      name: And(
        ...query.map((term) =>
          ILike(`%${term}%`))),
    },
  });

  if (results.length === 0) {
    return res.json({
      status: "error",
      message: "NoResult",
    });
  }

  res.json(results);
}

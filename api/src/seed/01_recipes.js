import { AppDataSource } from '../data-source.js';
import { Recipe } from '../entity/Recipe.js';
import { Ingredient } from '../entity/Ingredient.js';

/**
 * @type {SeedFunction}
 */
const seedRecipes = async () => {
  const repo = AppDataSource.getRepository(Recipe);
  if (await repo.count() > 0) {
    console.warn('No data inserted because some data are already present');
    return;
  }

  const ingredientRepo = AppDataSource.getRepository(Ingredient);

  const ingredients = [
    ingredientRepo.create({ name: 'Abricots secs (25g)', quantity: 1 }),
    ingredientRepo.create({ name: 'Cannelle (1 baton)', quantity: 1 }),
    ingredientRepo.create({ name: 'Carottes (80g)', quantity: 1 }),
    ingredientRepo.create({ name: 'Coriandre (20g)', quantity: 1 }),
    ingredientRepo.create({ name: 'Cuisses de canard (x2)', quantity: 1 }),
    ingredientRepo.create({ name: 'Ail (x1)', quantity: 1 }),
    ingredientRepo.create({ name: 'Oignon jaune (x1)', quantity: 1 }),
    ingredientRepo.create({ name: 'Pomme de terre (220g)', quantity: 1 }),
    ingredientRepo.create({ name: 'Epices marocaines', quantity: 1 }),
  ];
  await ingredientRepo.save(ingredients);

  const recipe = repo.create({
    name: 'Tajine de canard aux abricots secs',
    imageUrl: 'https://s3.eu-central-1.amazonaws.com/media.quitoque.fr/recipe_w1536_h1024/recipes/images/paves-charolais-grilles-au-chutney-de-pomme/paves-charolais-grilles-au-chutney-de-pomme-12.jpg',
    steps: [
      'Dans une cocotte, faites chauffer un filet d\'huile d\'olive à feu moyen à vif. Faites dorer les cuisses de canard 2 min sur chaque côté. Salez, poivrez. Réservez-les. Pendant ce temps, épluchez et coupez les carottes et les pommes de terre en morceaux. Emincez l\'oignon. Pressez ou hachez l\'ail. Ciselez la coriandre (en entier, les tiges se consomment).',
      'Dans la même cocotte, faites de nouveau chauffer un filet d\'huile d\'olive à feu moyen à vif. Faites revenir l\'oignon, le mélange marocain, l\'ail, les carottes 5 min.Au bout des 5 min, ajoutez les cuisses de canard, le miel, les pommes de terre, le bâton de cannelle, la moitié de la coriandre, les abricots secs, le bouillon de poule et de l\'eau à mi hauteur de la garniture. Salez, poivrez.Couvrez et poursuivez la cuisson 1h environ à feu doux. Goûtez et rectifiez l\'assaisonnement si nécessaire.',
      'Servez sans attendre votre tajine de canard aux abricots secs parsemé du reste de coriandre !',
    ],
    prepTime: 20,
    cookingTime: 70,
    ingredients: ingredients,
  });
  await repo.save(recipe);
};

seedRecipes.seedName = 'seedRecipes';

export default seedRecipes;

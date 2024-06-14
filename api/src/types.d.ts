interface IIngredient {
  id: number,
  name: string,
  imageUrl?: string,
}

interface IRecipe {
  id: number,
  name: string,
  imageUrl: string,
  cookingTime: number,
  prepTime: number,
  steps: Array<string>,
  ingredients: Array<IIngredient>
}

interface IUser {
  id: number,
  name: string,
  password: string,
  email: string,
}

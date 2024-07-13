export function seedIfNeeded () {
  if (process.env.NODE_ENV !== 'production') {
    console.info('Will seed data to the DB');
    doSeed().then();
  }
}

async function doSeed () {
  const seedFunctions = await Promise.all([
    import('./00_users.js'),
    import('./01_recipes.js'),
  ])
    .then((modules) =>
      modules.map((module) =>
        module.default));

  for (let seedFunction of seedFunctions) {
    console.info(`Running ${seedFunction.seedName}`);
    await seedFunction();
  }
}

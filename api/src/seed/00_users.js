import { AppDataSource } from '../data-source.js';
import { User } from '../entity/User.js';
import bcrypt from 'bcryptjs';

/**
 * @type {SeedFunction}
 */
const seedUsers = async () => {
  const repo = AppDataSource.getRepository(User);
  if (await repo.count() > 0) {
    console.warn('No data inserted because some data are already present');
    return;
  }

  const root = repo.create({
    name: 'root',
    email: 'root@example.com',
    password: bcrypt.hashSync('password', 10),
  });
  await repo.save(root);
};

seedUsers.seedName = 'seedUsers';

export default seedUsers;

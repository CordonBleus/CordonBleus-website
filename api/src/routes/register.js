import {AppDataSource} from "../data-source.js";
import {User} from "../entity/User.js";
import bcrypt from "bcryptjs";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    const userRepo = AppDataSource.getRepository(User);

    if (await userRepo.existsBy([
        {name: username},
        {email: email},
    ])) {
        return res.status(403).json({error: "User already exists"});
    }

    const user = userRepo.create({
        name: username,
        email: email,
        password: bcrypt.hashSync(password),
    });
    await userRepo.save(user);

    res.status(200).json({user});
};

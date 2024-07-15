import {User} from "../entity/User.js";
import {AppDataSource} from "../data-source.js";
import bcrypt from "bcryptjs";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const loginUser = async (req, res) => {
    const {password, username} = req.body;

    if (password == null || username == null) {
        return res.status(401).json({});
    }

    const userRepo = AppDataSource.getRepository(User);
    const potentialUser = await userRepo.findOneBy({name: username});

    if (potentialUser == null) {
        return res.status(401).json({});
    }

    if (bcrypt.compareSync(password, potentialUser.password)) {
        return res.status(200).json({username: potentialUser.name});
    }

    res.status(500).json({body: req.body, user: potentialUser});
};

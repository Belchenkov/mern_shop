import asyncHandler from "express-async-handler";

import User from '../models/UserModel.js';
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const { _id, name, email, isAdmin } = user;

        res.json({
            _id,
            name,
            email,
            isAdmin,
            token: generateToken(_id)
        });
    } else {
        res.status(401);

        throw new Error('Invalid email or password');
    }

});

export { authUser };
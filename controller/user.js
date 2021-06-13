import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import shortid from 'shortid';

import { uploadUserpic } from '../middleware/multer';

export const signup = (req, res) => {
    try {
        uploadUserpic(req, res, (err) => {
            if (err) {
                res.status(400).json({ error: err.message })
            } else {

                User.findOne({ email: req.body.email }).exec(async (error, user) => {
                    if (user)
                        return res.status(400).json({
                            message: "Email is already registered",
                        });


                    const { name, email, password } = req.body;

                    const salt = bcrypt.genSaltSync(10);
                    const hash_password = bcrypt.hashSync(password, salt);

                    const _user = new User({
                        name,
                        email,
                        hash_password,
                        image: req.file.location,
                        username: shortid.generate(),
                    });


                    _user.save((error, data) => {
                        if (error) {
                            return res.status(400).json({
                                message: error.message,
                            });
                        }

                        if (data) {
                            return res.status(201).json({
                                message: "User created.",
                            });
                        }
                    });
                });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

};

export const signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {

        if (error) return res.status(400).json({ error });
        if (user) {
            const isPassword = await user.passwordCheck(req.body.password);
            if (isPassword) {

                const { _id, name, email, username } = user;
                const token = jwt.sign({ _id, username }, process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                )
                res.status(200).json({
                    token,
                    user: { name, email },
                });
            } else {
                return res.status(400).json({
                    message: "Invalid Password",
                });
            }
        } else {
            return res.status(400).json({ message: "No user found" });
        }
    });
};

// exports.signout = (req, res) => {
//     res.clearCookie("token");
//     res.status(200).json({
//         message: "Signout successfully...!",
//     });
// };

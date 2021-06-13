import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 23,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
        },
        image: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: [isEmail, 'invalid email'],
        },
        hash_password: {
            type: String,
            required: true,
        }
    }
);

userSchema.methods = {
    passwordCheck: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    },
};

module.exports = mongoose.model("User", userSchema);

import mongoose from 'mongoose';

const postMediaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        }
    }
);


module.exports = mongoose.model("Postmedia", postMediaSchema);

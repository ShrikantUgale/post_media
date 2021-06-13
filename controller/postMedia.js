import Postmedia from '../models/postMedia';
import { uploadMedia } from '../middleware/multer';


export const postMedia = (req, res) => {
    try {
        uploadMedia(req, res, (err) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {

                const { username } = req.user;
                const { title, description } = req.body;

                const _postMedia = new Postmedia({
                    image: req.file?.location || "No media",
                    username,
                    title,
                    description
                });
                _postMedia.save((error, data) => {
                    if (error) {
                        return res.status(400).json({
                            message: error.message,
                        });
                    }

                    if (data) {
                        return res.status(200).json({
                            message: "Successfully uploaded media",
                            ...data._doc
                        });
                    }
                });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

export const getMedia = (req, res) => {

    const perPage = 10;
    let page = Number(req.query.page) || 0;

    Postmedia.find()
        .select({ "_id": 1, "image": 1, "title": 1, "description": 1 })
        .limit(perPage)
        .skip(perPage * page).exec(async (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(200).send({ posts, nextPage: page + 1 });
            }
        });
}

export const getMediaByid = (req, res) => {

    Postmedia.findById(req.params.id)
        .select({ "_id": 1, "image": 1, "title": 1, "description": 1 })
        .exec(async (error, media) => {
            if (error) {
                res.status(400).json({ error: error.message });
            } else if (media) {
                res.status(200).send(media);
            } else {
                res.status(400).send({ message: "Invalid id" });
            }
        });
}

export const deleteMediaByid = (req, res) => {

    Postmedia.deleteOne({
        $and: [
            { _id: req.params.id },
            { username: req.user.username }
        ]
    }).exec(async (error, media) => {
        if (error) {
            res.status(400).json({ error: error.message });
        } else if (media.deletedCount) {
            res.status(200).send({ message: 'Media deleted' });
        } else {
            res.status(400).send({ message: 'Media does not exist or you do not have rights to delete it' });
        }
    });
}

export const updateMediaByid = (req, res) => {

    uploadMedia(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {

            const { username } = req.user;
            const { title, description } = req.body;

            const postMediaObj = {
                _id: req.params.id,
                image: req.file?.location || "No media",
                username,
                title,
                description
            }

            Postmedia.updateOne({
                $and: [
                    { _id: req.params.id },
                    { username: req.user.username }
                ]
            }, postMediaObj).exec(async (error, media) => {
                if (error) {
                    res.status(400).json({ error: error.message });
                } else if (media.nModified) {
                    res.status(200).send({ message: 'Media Updated' });
                } else {
                    res.status(400).send({ message: 'You do not have permissions to update this post' });
                }
            });
        }
    })
}
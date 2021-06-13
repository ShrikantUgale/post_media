import dotenv from 'dotenv';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { s3 } from './aws';

dotenv.config();


const userBucketName = process.env.USER_BUCKET_NAME;
const postsrBucketName = process.env.UPLOD_POSTS_BUCKET;


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(new Error('Only jpeg, jpg and png files are supported'), false);
    }
}

export const uploadUserpic = multer({
    storage: multerS3({
        s3: s3,
        bucket: userBucketName,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}${path.extname(file.originalname)}`)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },

    }),
    fileFilter: fileFilter,
}).single('file');


export const uploadMedia = multer({
    storage: multerS3({
        s3: s3,
        bucket: postsrBucketName,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}${path.extname(file.originalname)}`)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },

    }),
    fileFilter: fileFilter,
}).single('file');

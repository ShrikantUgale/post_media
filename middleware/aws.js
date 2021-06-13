import dotenv from 'dotenv';
import S3 from 'aws-sdk/clients/s3';

dotenv.config();

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.BUCKET_REGION;

export const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

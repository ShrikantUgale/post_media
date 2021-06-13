import express from 'express';
import {
    postMedia, getMedia, getMediaByid,
    deleteMediaByid, updateMediaByid
} from '../controller/postMedia';
import { verifyToken } from '../middleware/verifyToken'

const router = express.Router();


router.post('/postmedia/:id', verifyToken, updateMediaByid);
router.post('/postmedia', verifyToken, postMedia);


router.get('/getmedia/:id', verifyToken, getMediaByid);
router.delete('/getmedia/:id', verifyToken, deleteMediaByid);
router.get('/getmedia', verifyToken, getMedia);


module.exports = router;
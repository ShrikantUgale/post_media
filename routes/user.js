import express from 'express';
import { signup, signin } from '../controller/user';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;
import express from 'express';
import { container } from '../../../container/container';

const router = express.Router();


router.get("/", container.ArticlesControllers.createArticle);



export default router;
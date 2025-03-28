import express from 'express';
import { container } from '../../../container/container';
import validate from '../../../middlewares/validate.middleware';
import { createArticleSchema } from '../validators/createArticle.validators';
import { upload } from '../../../config/cloudinary';
import { authenticateJWT } from '../../../middlewares/auth.middleware';

const router = express.Router();
const articlesControllers = container.ArticlesControllers

router.post('/', authenticateJWT, upload.array('images', 5), articlesControllers.createArticle);
router.post('/all', authenticateJWT, articlesControllers.getArticles);



export default router;
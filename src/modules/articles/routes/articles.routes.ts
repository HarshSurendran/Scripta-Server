import express from 'express';
import { container } from '../../../container/container';
import { upload } from '../../../config/cloudinary';
import { authenticateJWT } from '../../../middlewares/auth.middleware';

const router = express.Router();
const articlesControllers = container.ArticlesControllers;

router.post('/', authenticateJWT, upload.array('images', 5), articlesControllers.createArticle);
router.post('/all', authenticateJWT, articlesControllers.getArticles);
router.get('/', authenticateJWT, articlesControllers.getUserArticles);
router.patch('/:id', authenticateJWT, upload.array('images', 5), articlesControllers.updateArticle);
router.delete('/:id', authenticateJWT, articlesControllers.deleteArticle);
router.patch('/userActions/:id', authenticateJWT, articlesControllers.alterUserAction);

export default router;
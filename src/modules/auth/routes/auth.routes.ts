import express from 'express';
import { container } from '../../../container/container';
import validate from '../../../middlewares/validate.middleware';
import { signupSchema } from '../validators/signup.validators';

const router = express.Router();

const authController = container.AuthControllers;


router.post('/login', authController.login);
router.post('/signup', validate(signupSchema), authController.signup);
router.post('/logout', authController.logout);


export default router;
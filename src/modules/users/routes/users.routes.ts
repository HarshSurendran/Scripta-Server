import express from 'express';
import { container } from '../../../container/container';
import { authenticateJWT } from '../../../middlewares/auth.middleware';


const router = express.Router();
const usersControllers = container.UsersControllers


router.patch('/', authenticateJWT, usersControllers.updateUser);




export default router;

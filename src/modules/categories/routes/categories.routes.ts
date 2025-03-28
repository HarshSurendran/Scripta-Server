import express from "express";
import { authenticateJWT } from "../../../middlewares/auth.middleware";
import { container } from "../../../container/container";

const router = express.Router();
const categoriesControllers = container.CategoriesControllers

router.get("/", authenticateJWT, categoriesControllers.getAllCategories);


export default router;
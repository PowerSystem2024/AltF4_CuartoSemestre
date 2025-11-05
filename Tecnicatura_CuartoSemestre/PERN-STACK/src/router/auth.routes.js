import Router from "express-promise-router";
import { signin, signup, signout, profile } from "../controllers/auth.controllers.js";
import { isAuth } from "../middlewares/auth.middlewares.js";
import {validateSchema} from "../middlewares/validate.middleware.js";
import {signupSchema, signinSchema} from "../schemas/auth.schemas.js";
import {z} from 'zod';
const router=Router();

router.post("/signin", validateSchema(signinSchema), signin);

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/signout", signout);

router.get("/profile", isAuth, profile);

export default router;
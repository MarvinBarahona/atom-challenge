import {Router as expressRouter} from "express";
import {checkUserExist, createUser} from "./user.controller";

const router = expressRouter();

router.get("/check", checkUserExist);
router.post("/", createUser);

export default router;

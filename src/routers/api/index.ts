import { Router } from "express";
import requests from "./requests";

const router = Router();

router.use("/requests", requests);

export default router;

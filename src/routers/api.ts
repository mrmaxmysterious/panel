import { Response, Router } from "express";
import { logger } from "../app";
import { Response as ResponseType } from "../types/index";

const router = Router();

router.get("/timetable/fetch", async (req, res: Response<ResponseType>) => {
  return res.status(200).json({ error: false, message: "OK" });
});

export default router;

import { Router } from "express";
import { logger } from "../app";
import path from "node:path";
import { existsSync } from "node:fs";

const router = Router();

router.get("/render/:page", async (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "views",
    "pages",
    `${req.params.page}.ejs`
  );
  if (!existsSync(filePath)) {
    logger.error(`Page not found /views/${req.params.page}.ejs`);
    return res.status(404).json({ error: true, message: "Not Found" });
  }
  logger.info(`Rendering ${req.params.page}.ejs`);
  console.log(req.query);
  res.render(`pages/${req.params.page}.ejs`, {
    user: req.user,
    req,
  });
});

export default router;

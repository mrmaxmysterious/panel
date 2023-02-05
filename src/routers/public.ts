import { Router } from "express";
import { logger } from "../app";

const router = Router();

router.get("/render/:page", async (req, res) => {
  try {
    const page = require(`../views/${req.params.page}.ejs`);
    if (!page) return res.status(404).send("Not Found");
    logger.info(`Rendering ${req.params.page}.ejs`);
    res.render(`/src/views/${req.params.page}.ejs`, {
      user: req.user,
    });
  } catch (error) {
    logger.error(`Page not found: /views/${req.params.page}.ejs`);
    console.error(error);
    return res.status(404).json({ message: "Not Found" });
  }
});

export default router;

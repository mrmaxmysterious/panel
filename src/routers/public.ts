import { Router } from "express";
import { logger } from "../app";

const router = Router();

router.get("/render/:page", async (req, res) => {
  try {
    const page = require(`../views/${req.params.page}`);
    if (!page) return res.status(404).send("Not Found");
    res.render(`../views/${req.params.page}`, {
      user: req.user,
    });
  } catch (error) {
    logger.error(`Page not found: /render/${req.params.page}`);
    return res.status(404).json({ message: "Not Found" });
  }
});

export default router;

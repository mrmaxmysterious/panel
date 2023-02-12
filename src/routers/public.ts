import { Router } from "express";
import { logger } from "../app";
import path from "node:path";
import { existsSync } from "node:fs";

const router = Router();

router.get("/*", async (req, res, next) => {
  if (req.user) {
    const filePath = path.join(
      __dirname,
      "..",
      "views",
      "pages",
      `index.ejs`
    );
    res.redirect("/staff/home")
  } else {
    next();
  }
});

router.get("/login", async (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "views",
    "pages",
    `login.ejs`
  );
  if (!existsSync(filePath)) {
    logger.error(`Page not found /views/login.ejs`);
    return res.status(404).json({ error: true, message: "Not Found" });
  }
  logger.info(`Rendering login.ejs`);
  res.render("pages/login.ejs", {
    req,
  });
});

export default router;

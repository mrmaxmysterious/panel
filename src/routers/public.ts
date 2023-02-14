import { Router } from "express";
import { logger } from "../app";
import path from "node:path";
import { existsSync } from "node:fs";

const router = Router();

router.get("/", async (req, res) => {
  if (req.user) return res.redirect("/staff/home");
  res.redirect("/login");
});

router.get("/login", async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "pages", `login.ejs`);
  if (!existsSync(filePath)) {
    logger.error(`Page not found /views/login.ejs`);
    return res.status(404).json({ error: true, message: "Not Found" });
  }
  logger.info(`Rendering login.ejs`);
  res.render("pages/login.ejs", {
    req,
  });
});

router.get("/requestaccess", async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "pages", `login.ejs`);
  if (!existsSync(filePath)) {
    logger.error(`Page not found /views/requestaccess.ejs`);
    return res.status(404).json({ error: true, message: "Not Found" });
  }
  logger.info(`Rendering requestaccess.ejs`);
  res.render("pages/requestaccess.ejs", {
    req,
  });
});

export default router;

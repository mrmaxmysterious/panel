import { Response, Router } from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import { logger } from "../../app";
import { User } from "@prisma/client";

const router = Router();

router.get("/*", async (req, res) => {
  const user = req.user as User;
  if (req.user && user.role === "manager") {
    const filePath = path.join(__dirname, "..", "views", "pages", `index.ejs`);
    res.render("pages/index.ejs", {
      user: req.user,
      req,
    });
  } else {
    res.redirect("/staff/home");
  }
});

router.get("/render/:page", async (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "views",
    "pages",
    "media",
    `${req.params.page}.ejs`
  );
  if (!existsSync(filePath)) {
    logger.error(`Page not found /views/media/${req.params.page}.ejs`);
    return res.status(404).json({ error: true, message: "Not Found" });
  }
  logger.info(`Rendering ${req.params.page}.ejs`);
  console.log(req.query);
  res.render(`pages/media/${req.params.page}.ejs`, {
    user: req.user,
    req,
  });
});

export default router;

import { Router } from "express";
import passport from "passport";
import { prisma } from "../lib/database";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/staff/home?auth=true",
    failureRedirect: "/login?auth=false",
  })
);

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Could not logout");
  });
  res.redirect("/");
});

router.post("/request", (req, res) => {
  let newUser = prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
      disabled: true
    }
  })
});

export default router;

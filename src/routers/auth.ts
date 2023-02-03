import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/?auth=true",
    failureRedirect: "/?auth=false",
  })
);

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Could not logout");
  });
  res.redirect("/");
});

export default router;

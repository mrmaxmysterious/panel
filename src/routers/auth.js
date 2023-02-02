const express = require("express");
const router = express.Router();
const passport = require("passport");

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

module.exports = router;

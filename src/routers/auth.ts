import { Router } from "express";
import passport from "passport";
import { prisma } from "../lib/database";
import { RequestAccessBody } from "../schemas";
import { genSalt, hash } from "bcrypt";

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

router.post("/request", async (req, res) => {
  try {
    const parsedBody = await RequestAccessBody.parseAsync(req.body);
    const { username, password } = parsedBody;

    const salt = await genSalt(10);
    const hashed = await hash(password, salt);

    await prisma.user.create({
      data: {
        username,
        password: hashed,
      },
    });

    return res.redirect("/requestaccess?requested=true");
  } catch (error: any) {
    if (error.issues)
      return res.redirect("/requestaccess?error=Validation error");
    return res.redirect("/requestaccess?error=Unexpected error");
  }
});

export default router;

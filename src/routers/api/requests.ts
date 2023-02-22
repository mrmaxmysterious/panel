import { isStaff } from "../../../src/middleware/auth";
import { prisma } from "../../../src/lib/database";
import { Router } from "express";

const router = Router();

router.use(isStaff);

router.get("/", async (req, res) => {
  console.log(req.user);

  const requests = await prisma.request.findMany({
    where: {},
  });

  return res.status(200).json({ error: false, message: requests });
});

export default router;

import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authToken, authorizePermission } from "../middleware.js";
import { Permission } from "../authorization.js";

const prisma = new PrismaClient();
const router = Router();

router.use(authToken);

router.post("/logout", authorizePermission(Permission.LOGOUT), async (req, res) => {
  try {
    await prisma.tokens.deleteMany({ where: { token: req.headers.authorization } });
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default router;

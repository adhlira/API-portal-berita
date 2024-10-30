import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = Router();

router.post("/sign_up", async (req, res) => {
  const { name, email, password } = req.body;
  const round = 4;
  const role_id = 2;
  const user = await prisma.users.create({
    data: {
      role_id: role_id,
      name: name,
      email: email,
      password: bcrypt.hashSync(password, round),
    },
  });
  return res.status(200).json(user);
});

export default router;

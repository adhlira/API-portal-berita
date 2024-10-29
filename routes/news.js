import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Permission } from "../authorization.js";
import { authToken, authorizePermission } from "../middleware.js";
import { AxiosHeaders } from "axios";

const prisma = new PrismaClient();
const router = Router();

router.use(authToken);

router.get("/news", authorizePermission(Permission.BROWSE_NEWS), async (req, res) => {
  try {
    const news = await prisma.news.findMany();
    if (!news) {
      return res.status(400).json({ message: "Data is empty" });
    } else {
      return res.status(200).json({ message: "Data News", news });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/news", authorizePermission(Permission.ADD_NEWS), async (req, res) => {
  const { category_id, title, body } = req.body;
  const user = await prisma.tokens.findFirst({ where: { token: req.headers.authorization } });
  try {
    if (!category_id || !title || !body) {
      return res.status(400).json("Data incompleted");
    } else {
      const news = await prisma.news.create({
        data: {
          category_id: category_id,
          users_id: user.user_id,
          body: body,
          title: title,
        },
      });
      return res.status(200).json({ message: "Data created successfully", news });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/news/:id", authorizePermission(Permission.BROWSE_NEWS), async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: "News id is unknown" });
    }
    const news = await prisma.news.findFirst({ where: { id: +req.params.id } });
    if (!news) {
      return res.status(404).json({ message: "Data news not found" });
    } else {
      return res.status(200).json({ message: "Data news", news });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/news/:id", authorizePermission(Permission.EDIT_NEWS), async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: "News id unknown" });
    }
    const news = await prisma.news.findFirst({ where: { id: +req.params.id } });
    if (!news) {
      return res.status(404).json({ message: "Data news not found" });
    } else {
      const news_updated = await prisma.news.update({
        where: { id: +req.params.id },
        data: req.body,
      });
      return res.status(200).json({ message: "Data updated successfully", news_updated });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/news/:id", authorizePermission(Permission.DELETE_NEWS), async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: "News id unknown" });
    }
    const news = await prisma.news.findFirst({ where: { id: +req.params.id } });
    if (!news) {
      return res.status(404).json({ message: "Data news not found" });
    } else {
      await prisma.news.delete({ where: { id: +req.params.id } });
      return res.status(200).json({ message: "Data news has been deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default router;

import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Permission } from "../authorization.js";
import { authToken, authorizePermission } from "../middleware.js";

const prisma = new PrismaClient();
const router = Router();

router.use(authToken);

router.post("/categories", authorizePermission(Permission.ADD_CATEGORY), async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Data Incompleted" });
  }
  const isExist = await prisma.categories.findFirst({ where: { name: name } });
  if (isExist) {
    return res.status(400).json({ message: "Category name is already exist" });
  }
  try {
    const new_category = await prisma.categories.create({
      data: {
        name: name,
      },
    });
    return res.status(200).json({ message: "Created Data Successfully", new_category });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/categories", authorizePermission(Permission.BROWSE_CATEGORY), async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    if (!categories) {
      return res.status(404).json({ message: "Category Data is empty" });
    } else {
      return res.status(200).json({ message: "Data Categories", categories });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/categories/:id", authorizePermission(Permission.BROWSE_CATEGORY), async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: "Category ID Unknown" });
    }
    const category = await prisma.categories.findFirst({ where: { id: +req.params.id } });
    if (!category) {
      return res.status(404).json({ message: "Data Category Not Found" });
    } else {
      return res.status(200).json({ message: "Data Category", category });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/categories/:id", authorizePermission(Permission.EDIT_CATEGORY), async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: "Category ID Unknown" });
    }
    const category = await prisma.categories.findFirst({ where: { id: +req.params.id } });
    if (!category) {
      return res.status(404).json({ message: "Data Category Not Found" });
    } else {
      const isExist = await prisma.categories.findFirst({ where: { name: req.body.name } });
      if (isExist) {
        return res.status(400).json({ message: "Category name is already exist" });
      }
      const category_updated = await prisma.categories.update({
        where: { id: +req.params.id },
        data: req.body,
      });
      return res.status(200).json({ message: "Data Updated Successfully", category_updated });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.delete("/categories/:id", authorizePermission(Permission.DELETE_CATEGORY), async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ message: "Category ID Unknown" });
    }
    const category = await prisma.categories.findFirst({ where: { id: +req.params.id } });
    if (!category) {
      return res.status(404).json({ message: "Data Category Not Found" });
    } else {
      await prisma.categories.delete({ where: { id: +req.params.id } });
      return res.status(200).json({ message: "Data Category has been deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default router;

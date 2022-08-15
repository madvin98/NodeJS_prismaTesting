const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/product", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { Category: true },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/product", async (req, res, next) => {
  try {
    const products = await prisma.product.create({
      data: req.body,
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.delete("/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

router.patch("/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
      include: { Category: true },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

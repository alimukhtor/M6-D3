import express from "express";
import { Product, Review, Category, productCategory } from "../.././server.js";
import { Op } from "sequelize";

const productsRouter = express.Router();

productsRouter.get("/", async (request, response, next) => {
  try {
    const products = await Product.findAll({
      include: [Review, Category],

      where: {
        ...(request.query.search && {
          [Op.or]: [
            {
              name: { [Op.iLike]: `%${request.query.search}%` },
            },
            {
              description: { [Op.iLike]: `%${request.query.search}%` },
            },
          ],
        }),
      },
      order: [["name", "ASC"]],
      // limit:request.query.limit,
      // offset: parseInt(request.query.limit * request.query.page)
    });
    response.send(products);
  } catch (error) {
    console.log("errro is:", error);
    next(error);
  }
});

productsRouter.get("/", async (request, response, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          through: { attributes: [] },
          attributes: ["name"],
        },
      ],
      where: {
        ...(request.query.search && {
          [Op.or]: [
            {
              name: { [Op.iLike]: `%${request.query.search}%` },
            },
            {
              description: { [Op.iLike]: `%${request.query.search}%` },
            },
          ],
        }),
      },
      order: [["name", "ASC"]],
    });
    response.send(products);
  } catch (error) {
    console.log("errro is:", error);
    next(error);
  }
});
productsRouter.post("/", async (request, response, next) => {
  try {
    console.log(request.body);
    // const newProducts = await Product.create(request.body)
    const { categoryId, ...restCategory } = request.body;
    const newProducts = await Product.create(restCategory);
    if (newProducts) {
      console.log("Product id:", newProducts.id);

      const dataToInsert = categoryId.map((id) => ({
        categoryId: id,
        productId: newProducts.id,
      }));
      const data = await productCategory.bulkCreate(dataToInsert);
      response.send({ newProducts, productCategory: data });
    }
    response.status(201).send(newProducts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
productsRouter.get("/:id", async (request, response, next) => {
  try {
    const getProductById = await Product.findByPk(request.params.id);
    if (getProductById) {
      response.send(getProductById);
    } else {
      response
        .status(404)
        .send(`The prduct with an id of ${request.params.id} is not found`);
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.put("/:id", async (request, response, next) => {
  try {
    const updateProduct = await Product.update(request.body, {
      where: { id: request.params.id },
      returning: true,
    });

    response.send(updateProduct[1][0]);
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:id", async (request, response, next) => {
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: request.params.id,
      },
    });
    if (deleteProduct > 0) {
      response.send(
        `The chosen Product with a specific Id ${request.params.id} is deleted`
      );
    }
  } catch (error) {
    next(error);
  }
});

export default productsRouter;

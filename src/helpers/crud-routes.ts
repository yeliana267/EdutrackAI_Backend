import { Router } from "express";
import { idParamSchema } from "./validations";
import { validateBody, validateParams } from "../middlewares/validate.middlewares";

type CrudController = {
  getAll: any;
  getById: any;
  create: any;
  update: any;
  remove: any;
};

export const createCrudRoutes = (
  controller: CrudController,
  createSchema: any,
  updateSchema: any,
) => {
  const router = Router();

  router.get("/", controller.getAll);
  router.get("/:id", validateParams(idParamSchema), controller.getById);
  router.post("/", validateBody(createSchema), controller.create);
  router.put("/:id", validateParams(idParamSchema), validateBody(updateSchema), controller.update);
  router.delete("/:id", validateParams(idParamSchema), controller.remove);

  return router;
};
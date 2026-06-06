import { Request, Response } from "express";
import { getErrorResponse } from "./http-error";

type CrudControllerService = {
  getAll: () => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
  create: (data: Record<string, any>) => Promise<unknown>;
  update: (id: string, data: Record<string, any>) => Promise<unknown>;
  remove: (id: string) => Promise<void>;
};

export const createCrudController = (entityName: string, service: CrudControllerService) => {
  const getAll = async (_req: Request, res: Response) => {
    try {
      const records = await service.getAll();

      return res.status(200).json({
        ok: true,
        message: `${entityName} fetched successfully`,
        data: records,
      });
    } catch (error) {
      const errorResponse = getErrorResponse(error, `Failed to fetch ${entityName}`);

      return res.status(errorResponse.statusCode).json({
        ok: false,
        message: errorResponse.message,
      });
    }
  };

  const getById = async (req: Request, res: Response) => {
    try {
      const record = await service.getById(String(req.params.id));

      if (!record) {
        return res.status(404).json({
          ok: false,
          message: `${entityName} not found`,
        });
      }

      return res.status(200).json({
        ok: true,
        message: `${entityName} fetched successfully`,
        data: record,
      });
    } catch (error) {
      const errorResponse = getErrorResponse(error, `Failed to fetch ${entityName}`);

      return res.status(errorResponse.statusCode).json({
        ok: false,
        message: errorResponse.message,
      });
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      const record = await service.create(req.body);

      return res.status(201).json({
        ok: true,
        message: `${entityName} created successfully`,
        data: record,
      });
    } catch (error) {
      const errorResponse = getErrorResponse(error, `Failed to create ${entityName}`);

      return res.status(errorResponse.statusCode).json({
        ok: false,
        message: errorResponse.message,
      });
    }
  };

  const update = async (req: Request, res: Response) => {
    try {
      const record = await service.update(String(req.params.id), req.body);

      return res.status(200).json({
        ok: true,
        message: `${entityName} updated successfully`,
        data: record,
      });
    } catch (error) {
      const errorResponse = getErrorResponse(error, `Failed to update ${entityName}`);

      return res.status(errorResponse.statusCode).json({
        ok: false,
        message: errorResponse.message,
      });
    }
  };

  const remove = async (req: Request, res: Response) => {
    try {
      await service.remove(String(req.params.id));

      return res.status(200).json({
        ok: true,
        message: `${entityName} deleted successfully`,
      });
    } catch (error) {
      const errorResponse = getErrorResponse(error, `Failed to delete ${entityName}`);

      return res.status(errorResponse.statusCode).json({
        ok: false,
        message: errorResponse.message,
      });
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
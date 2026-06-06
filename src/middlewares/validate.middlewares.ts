import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateBody = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Validation error",
        errors: z.treeifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: "Validation error",
        errors: z.treeifyError(result.error),
      });
    }

    req.params = result.data as Record<string, string>;
    next();
  };
};
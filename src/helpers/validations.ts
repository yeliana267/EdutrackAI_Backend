import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export const decimalSchema = z.coerce.number().finite().nonnegative();

export const optionalStringSchema = z.string().trim().min(1).optional();

export const nullableStringSchema = z.string().trim().min(1).nullable().optional();

export const nonEmptyObject = <T extends z.ZodObject<any>>(schema: T) => {
  return schema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
};
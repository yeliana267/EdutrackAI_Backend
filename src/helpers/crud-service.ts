import { decryptRecords, decryptSelectedFields, encryptSelectedFields } from "./secure-fields";

type CrudServiceOptions = {
  model: any;
  encryptedFields?: string[];
  orderBy?: Record<string, "asc" | "desc">;
  select?: Record<string, any>;
  prepareCreate?: (data: Record<string, any>) => Promise<Record<string, any>> | Record<string, any>;
  prepareUpdate?: (data: Record<string, any>, id: string) => Promise<Record<string, any>> | Record<string, any>;
};

const buildReadArgs = (options: CrudServiceOptions) => {
  const args: Record<string, any> = {};

  if (options.select) args.select = options.select;
  if (options.orderBy) args.orderBy = options.orderBy;

  return args;
};

export const createCrudService = (options: CrudServiceOptions) => {
  const encryptedFields = options.encryptedFields ?? [];

  const getAll = async () => {
    const records = await options.model.findMany(buildReadArgs(options));
    return decryptRecords(records, encryptedFields);
  };

  const getById = async (id: string) => {
    const record = await options.model.findUnique({
      where: { id },
      ...(options.select ? { select: options.select } : {}),
    });

    return decryptSelectedFields(record, encryptedFields);
  };

  const create = async (data: Record<string, any>) => {
    const preparedData = options.prepareCreate ? await options.prepareCreate(data) : data;
    const encryptedData = encryptSelectedFields(preparedData, encryptedFields);
    const record = await options.model.create({
      data: encryptedData,
      ...(options.select ? { select: options.select } : {}),
    });

    return decryptSelectedFields(record, encryptedFields);
  };

  const update = async (id: string, data: Record<string, any>) => {
    const preparedData = options.prepareUpdate ? await options.prepareUpdate(data, id) : data;
    const encryptedData = encryptSelectedFields(preparedData, encryptedFields);
    const record = await options.model.update({
      where: { id },
      data: encryptedData,
      ...(options.select ? { select: options.select } : {}),
    });

    return decryptSelectedFields(record, encryptedFields);
  };

  const remove = async (id: string) => {
    await options.model.delete({
      where: { id },
    });
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
import { decrypt, encrypt } from "./encryption";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const encryptSelectedFields = <T extends Record<string, any>>(
  data: T,
  fields: string[],
) => {
  const encryptedData: Record<string, any> = { ...data };

  for (const field of fields) {
    if (typeof encryptedData[field] === "string") {
      encryptedData[field] = encrypt(encryptedData[field]);
    }
  }

  return encryptedData as T;
};

export const decryptSelectedFields = <T extends Record<string, any> | null>(
  data: T,
  fields: string[],
) => {
  if (!data) return data;

  const decryptedData = { ...data };

  for (const field of fields) {
    if (typeof decryptedData[field] === "string") {
      decryptedData[field] = decrypt(decryptedData[field]);
    }
  }

  return decryptedData;
};

export const decryptRecords = <T extends Record<string, any>>(
  records: T[],
  fields: string[],
) => {
  return records.map((record) => decryptSelectedFields(record, fields));
};
import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

const getEncryptionKey = () => {
  const rawKey = process.env.ENCRYPTION_KEY;

  if (!rawKey) {
    throw new Error("ENCRYPTION_KEY is missing");
  }

  if (/^[a-f0-9]{64}$/i.test(rawKey)) {
    return Buffer.from(rawKey, "hex");
  }

  const base64Key = Buffer.from(rawKey, "base64");
  if (base64Key.length === 32) {
    return base64Key;
  }

  const utf8Key = Buffer.from(rawKey);
  if (utf8Key.length === 32) {
    return utf8Key;
  }

  return crypto.createHash("sha256").update(rawKey).digest();
};

const getDeterministicIv = (text: string, key: Buffer) => {
  return crypto.createHmac("sha256", key).update(text).digest().subarray(0, IV_LENGTH);
};

export const encrypt = (text: string): string => {
  const key = getEncryptionKey();
  const iv = getDeterministicIv(text, key);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (text: string): string => {
  if (!text || !text.includes(":")) return text;

  try {
    const key = getEncryptionKey();
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift()!, "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString("utf8");
  } catch (_error) {
    return text;
  }
};
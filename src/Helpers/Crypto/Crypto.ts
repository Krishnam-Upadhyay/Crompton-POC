import { decryptV2, encryptV2 } from "./CryptoV2";

export const Encrypt = (input: any): string => {
  return encryptV2(input);
};

export const Decrypt = (input: string): string => {
  return decryptV2(input);
};

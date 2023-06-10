import crypto from "crypto";

export const cryptoWeb = crypto.getDiffieHellman("modp18");
export const keys = cryptoWeb.generateKeys();

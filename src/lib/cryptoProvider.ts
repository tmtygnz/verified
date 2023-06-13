import nacl from "tweetnacl";

export const webKeys = nacl.box.keyPair();
export const webPrivateKey = webKeys.secretKey;
export const webPublicKey = webKeys.publicKey;

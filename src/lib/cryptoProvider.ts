import crypto, { createECDH } from "crypto";

export const webEnc = createECDH("secp384r1");
export const webEncPubKeyB64 = () => {
	webEnc.generateKeys();
	return webEnc.getPublicKey().toString("base64");
};

import forge from "node-forge";
export const encryptAES = (data: string, key: string) => {
	let iv = crypto.randomBytes(12);
	let sha = crypto.createHash("sha256");
	sha.update(key);

	let cipher = crypto.createCipheriv("aes-256-gcm", sha.digest(), iv);
	let ch = cipher.update(data);
	let encrypted = Buffer.concat([ch, cipher.final()]).toString("base64");
	return { iv: iv, encrypted };
};

export const decryptAES = async (
	iv: ArrayBuffer,
	encrypted: string,
	key: string
) => {
	let sha = crypto.createHash("sha256");
	sha.update(key);
	let enc = Buffer.from(encrypted, "base64");
	let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
	let decrypted = decipher.update(enc);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};

import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import { webKeys } from "./cryptoProvider";

function generateNonce() {
	return nacl.randomBytes(nacl.secretbox.nonceLength);
}

export function ecryptAes(data: string) {
	try {
		const nonce = generateNonce();
		let encryptedData = nacl.secretbox(
			Uint8Array.from(data, (c) => c.charCodeAt(0)),
			nonce,
			webKeys.secretKey
		);

		console.log(
			naclut.encodeUTF8(
				nacl.secretbox.open(encryptedData, nonce, webKeys.secretKey)!
			)
		);
		return { nonce, encryptedData };
	} catch (e) {
		console.log(e);
	}
}

export function decryptAes(base64EncryptedData: string, base64Nonce: string) {
	let encrypted = naclut.decodeBase64(base64EncryptedData);
	let nonce = naclut.decodeBase64(base64Nonce);

	let encryptedData = nacl.secretbox.open(
		encrypted,
		nonce,
		webKeys.secretKey
	)!;

	console.log({
		data: encryptedData,
		nonce: nonce,
		secret: webKeys.secretKey,
	});
}

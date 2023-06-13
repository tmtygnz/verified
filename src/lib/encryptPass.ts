import { fromByteArray } from "base64-js";
import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import { webPrivateKey } from "./cryptoProvider";

function generateNonce() {
	return nacl.randomBytes(nacl.secretbox.nonceLength);
}

export function ecryptAes(data: string) {
	const nonce = generateNonce();
	let encryptedData = nacl.secretbox(
		naclut.decodeUTF8(data),
		nonce,
		webPrivateKey
	);

	return { nonce, encryptedData };
}

export function decryptAes(encrypted: Uint8Array, nonce: Uint8Array) {
	let encryptedData = nacl.secretbox.open(encrypted, nonce, webPrivateKey);
	console.log(encryptedData);
}

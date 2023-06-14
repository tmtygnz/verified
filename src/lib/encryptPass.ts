import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import { webKeys } from "./cryptoProvider";

function generateNonce() {
	return nacl.randomBytes(nacl.secretbox.nonceLength);
}

export function decryptAes(
	base64EncryptedData: string,
	base64Nonce: string,
	shared: Uint8Array
) {
	let encrypted = naclut.decodeBase64(base64EncryptedData);
	let nonce = naclut.decodeBase64(base64Nonce);

	let encryptedData = nacl.secretbox.open(
		naclut.decodeBase64(base64EncryptedData),
		naclut.decodeBase64(base64Nonce),
		shared
	)!;

	console.log(
		"decrypted message received: ",
		naclut.encodeUTF8(encryptedData)
	);
}

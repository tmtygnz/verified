"use client";
import { socket } from "@grc/lib/socketProvider";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { ISession } from "@grc/interface/ISession";
import { fromByteArray } from "base64-js";
import { webPrivateKey, webPublicKey } from "@grc/lib/cryptoProvider";
import nacl from "tweetnacl";
import { decryptAes } from "@grc/lib/encryptPass";
import naclut from "tweetnacl-util";

const HomePage = () => {
	useEffect(() => {
		socket.emit("session-pls");

		socket.on("session-ok", (data: ISession) => {
			console.log(data);
			console.log("PubKeyEx");
			socket.emit("exchange", naclut.encodeBase64(webPublicKey));
		});

		socket.on("re-exchange", (serverPublicKey: string) => {
			console.log(serverPublicKey);
			const ecdhSecretKey = nacl.box.before(
				new Uint8Array(naclut.decodeBase64(serverPublicKey)),
				webPrivateKey
			);
			console.log(fromByteArray(ecdhSecretKey));
			socket.emit("test");
		});

		socket.on(
			"re-test",
			(e: { nonce: ArrayBuffer; encryptedData: ArrayBuffer }) =>
				decryptAes(
					new Uint8Array(e.encryptedData),
					new Uint8Array(e.nonce)
				)
		);
	}, []);
	return <div>{}</div>;
};

export default HomePage;

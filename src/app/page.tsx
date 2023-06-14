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
			socket.emit("exchange", webPublicKey);
		});

		socket.on("re-exchange", (serverPublicKey: Uint8Array) => {
			console.log(serverPublicKey);
			const ecdhSecretKey = nacl.box.before(
				new Uint8Array(serverPublicKey),
				webPrivateKey
			);
			console.log(naclut.encodeBase64(ecdhSecretKey));
			socket.emit("test");
		});

		socket.on("re-test", (e: { nonce: string; encrypted: string }) => {
			console.log(e);
			decryptAes(e.encrypted, e.nonce);
		});
	}, []);
	return <div>{}</div>;
};

export default HomePage;

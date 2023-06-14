"use client";
import { socket } from "@grc/lib/socketProvider";
import React, { useEffect, useState } from "react";
import { ISession } from "@grc/interface/ISession";
import { webKeys, webPrivateKey, webPublicKey } from "@grc/lib/cryptoProvider";
import nacl from "tweetnacl";
import { decryptAes } from "@grc/lib/encryptPass";
import naclut from "tweetnacl-util";
import { IEncrypted } from "@grc/interface/IEncrypted";

export let ecdhSecretKey: Uint8Array;

const HomePage = () => {
	useEffect(() => {
		socket.emit("session-pls");

		socket.on("session-ok", (data: ISession) => {
			socket.emit("exchange", webPublicKey);
		});

		socket.on("re-exchange", (serverPublicKey: Uint8Array) => {
			console.log(serverPublicKey);
			ecdhSecretKey = nacl.box.before(
				new Uint8Array(serverPublicKey),
				webPrivateKey
			);
			console.log(
				"computed Shared Key: ",
				naclut.encodeBase64(ecdhSecretKey)
			);

			socket.emit("ping");
		});
		socket.on("pong", (e: IEncrypted) => {
			decryptAes(e.data, e.nonce, ecdhSecretKey);
		});
	}, []);
	return <div>{}</div>;
};

export default HomePage;

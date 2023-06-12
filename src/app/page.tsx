"use client";
import { socket } from "@grc/lib/socketProvider";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { webEnc, webEncPubKeyB64 } from "@grc/lib/cryptoProvider";
import { ISession } from "@grc/interface/ISession";
import { decryptAES } from "@grc/lib/encryptPass";

const HomePage = () => {
	useEffect(() => {
		webEnc.generateKeys();

		socket.emit("session-pls");

		socket.on("session-ok", (data: ISession) => {
			console.log(data);
			console.log("PubKeyEx");
			socket.emit("exchange", webEncPubKeyB64());
		});

		socket.on("re-exchange", (serEncPubKeyB64: string) => {
			const sharedKey = webEnc.computeSecret(
				serEncPubKeyB64,
				"base64",
				"hex"
			);
			console.log(sharedKey);
			socket.emit("test");
		});
		socket.on("re-test", (e) => console.log(e));
	}, []);
	return <div>{}</div>;
};

export default HomePage;

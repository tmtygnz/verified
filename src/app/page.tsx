"use client";
import { socket } from "@grc/lib/socketProvider";
import React, { useEffect } from "react";
import Cookie from "js-cookie";

const HomePage = () => {
	useEffect(() => {
		socket.emit("session-new");
		socket.on("session-here", (a, b) => {
			Cookie.set("session", a);
		});
	});
	return <div>page</div>;
};

export default HomePage;

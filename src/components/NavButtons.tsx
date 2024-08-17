"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NavButtons = () => {
	const router = useRouter();
	return (
		<nav className="fixed w-full border-2 p-2 justify-around flex">
			<button
				className="p-2 rounded border-2 hover:bg-black hover:text-white"
				onClick={() => router.back()}
			>
				{"<-"} Go back
			</button>
			<button
				className="p-2 rounded border-2 hover:bg-black hover:text-white"
				onClick={() => router.forward()}
			>
				Go forward {"->"}
			</button>
		</nav>
	);
};

export default NavButtons;

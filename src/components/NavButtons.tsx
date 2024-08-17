"use client";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import React from "react";

const NavButtons = () => {
	const router = useRouter();
	const { user } = useUser();
	return (
		<>
			<button
				className="fixed left-0 top-0 p-2 rounded border-2 hover:bg-black hover:text-white"
				onClick={() => router.back()}
			>
				{"<-"} Go back
			</button>
			<button
				className="fixed right-0 top-0 p-2 rounded border-2 hover:bg-black hover:text-white"
				onClick={() => router.forward()}
			>
				Go forward {"->"}
			</button>
			<div className="fixed right-0 bottom-0 p-2 rounded border-2 hover:bg-black hover:text-white">
				{user.username}
			</div>
			<div className="fixed left-0 bottom-0 p-2 rounded border-2 hover:bg-black hover:text-white">
				id: {user.userId}
			</div>
		</>
	);
};

export default NavButtons;

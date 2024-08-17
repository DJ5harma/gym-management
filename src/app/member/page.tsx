import ErrorComponent from "@/components/ErrorComponent";
import { verifyJwt } from "@/lib/jwt";
import Link from "next/link";
import React from "react";

export default function page() {
	const { userId, userType } = verifyJwt();
	if (!userId || userType !== "MEMBER") return <ErrorComponent />;
	return (
		<div className="w-full h-full flex-col flex items-center justify-center gap-3 [&>*]:border-2 [&>*]:p-4 [&>*]:rounded-xl">
			<Link
				href="/messages"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Check messages
			</Link>
			<Link
				href="/member/fees"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Check fees
			</Link>
		</div>
	);
}

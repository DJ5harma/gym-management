import ErrorComponent from "@/components/ErrorComponent";
import SendMessageBtn from "@/components/SendMessageBtn";
import { verifyJwt } from "@/lib/jwt";
import Link from "next/link";
import React from "react";

export default function page() {
	const { userType } = verifyJwt();
	if (userType !== "ADMIN") return <ErrorComponent />;
	return (
		<div className="w-full h-full flex-col flex items-center justify-center gap-3 [&>*]:border-2 [&>*]:p-4 [&>*]:rounded-xl">
			<Link
				href="/admin/members"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Access/Modify Members
			</Link>
			<Link
				href="/admin/addMember"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Add a new member
			</Link>
			<Link
				href="/admin/fees"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				See all fees
			</Link>
			<Link
				href="/messages"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Check messages
			</Link>
			<SendMessageBtn />
		</div>
	);
}

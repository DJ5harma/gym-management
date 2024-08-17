import Link from "next/link";
import React from "react";

export default function page() {
	return (
		<div className="w-full h-full flex-col flex items-center justify-center gap-3 [&>*]:border-2 [&>*]:p-4 [&>*]:rounded-xl">
			<Link
				href="/admin/members"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Access all members
			</Link>
			<Link
				href="/admin/addFee"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Add a member{"'"}s fee
			</Link>
			<Link
				href="/admin/addMember"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Add a new member
			</Link>
			<Link
				href="/admin/sendMessage"
				className="hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
			>
				Send a message to all
			</Link>
		</div>
	);
}

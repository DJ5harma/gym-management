import ErrorComponent from "@/components/ErrorComponent";
import { db } from "@/lib/firebase";
import { verifyJwt } from "@/lib/jwt";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

export default async function page() {
	const { userType } = verifyJwt();
	if (!userType) return <ErrorComponent />;
	const messages = await getDocs(collection(db, "messages"));
	if (messages.docs.length === 0)
		return <ErrorComponent message="No messages till now" />;
	return (
		<div className="w-full h-full flex flex-col">
			{messages.docs.reverse().map((doc) => {
				const { message, createdAt } = doc.data();
				return (
					<div
						key={doc.id}
						className="border-2 flex p-4 gap-2 w-full justify-around items-center flex-col"
					>
						<p className="flex-1 font-semibold">Message: {message}</p>
						<p className="flex-1">
							Posted: {new Date(createdAt).toUTCString()}
						</p>
					</div>
				);
			})}
		</div>
	);
}

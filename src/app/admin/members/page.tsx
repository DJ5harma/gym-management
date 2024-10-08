import AddFeeBtn from "@/components/AddFeeBtn";
import DeleteMemberBtn from "@/components/DeleteMemberBtn";
import ErrorComponent from "@/components/ErrorComponent";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

export default async function page() {
	const members = await getDocs(collection(db, "members"));
	const filteredMembers = members.docs.map((member) => {
		const [id, { username, createdAt }] = [member.id, member.data()];
		return { id, username, createdAt };
	});
	if (filteredMembers.length === 0)
		return <ErrorComponent message="No members till now" />;

	return (
		<div className="w-full h-full flex flex-col">
			{filteredMembers.reverse().map((member) => {
				return (
					<div
						key={member.id}
						className="border-2 flex p-4 gap-2 w-full items-center flex-col"
					>
						<p className="flex-1 font-semibold">
							Member: {member.id}, {member.username}
						</p>
						<p className="flex-1">
							Joined: {new Date(member.createdAt).toUTCString()}
						</p>
						<div className="w-full flex-1 gap-3 flex justify-center">
							<AddFeeBtn id={member.id} username={member.username} />
							<DeleteMemberBtn id={member.id} username={member.username} />
						</div>
					</div>
				);
			})}
		</div>
	);
}

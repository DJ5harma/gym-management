import ErrorComponent from "@/components/ErrorComponent";
import { db } from "@/lib/firebase";
import { verifyJwt } from "@/lib/jwt";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

export default async function page() {
	const { userId, userType } = verifyJwt();
	if (!userId || userType !== "MEMBER") return <ErrorComponent />;
	const feesRef = collection(db, "fees");
	const fees = (
		await getDocs(query(feesRef, where("userId", "==", userId)))
	).docs.map((doc) => {
		const { paid, amount, reason, deadlineDate } = doc.data();
		return { id: doc.id, paid, amount, reason, deadlineDate };
	});
	if (fees.length === 0) return <ErrorComponent message="No fees till now" />;

	return (
		<div className="w-full h-full flex flex-col">
			{fees.reverse().map(({ amount, deadlineDate, id, paid, reason }) => {
				return (
					<div
						key={id}
						className="border-2 flex p-4 gap-2 w-full justify-around items-center flex-col"
					>
						<p className="flex-1">
							Deadline: {new Date(deadlineDate).toUTCString()}
						</p>
						<div
							className={`${
								paid ? "text-green-700" : "text-red-700"
							} p-2 rounded`}
						>
							Amount: Rs.{amount} ({paid ? "Paid" : "Pending"})
						</div>
						<p>Reason: {reason}</p>
					</div>
				);
			})}
		</div>
	);
}

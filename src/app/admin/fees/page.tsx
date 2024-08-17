import AddFeeBtn from "@/components/AddFeeBtn";
import ErrorComponent from "@/components/ErrorComponent";
import MarkFeePaidBtn from "@/components/MarkFeePaidBtn";
import { db } from "@/lib/firebase";
import { verifyJwt } from "@/lib/jwt";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

export default async function page() {
	const { userType } = verifyJwt();
	if (userType !== "ADMIN") return <ErrorComponent />;
	const fees = await getDocs(collection(db, "fees"));
	return (
		<div className="w-full h-full flex flex-col">
			{fees.docs.reverse().map((fee) => {
				const { username, userId, paid, deadlineDate, amount, reason } =
					fee.data();
				return (
					<div
						key={fee.id}
						className="border-2 flex p-4 gap-2 w-full justify-around items-center flex-col"
					>
						<p className="flex-1 font-semibold">
							Member: {fee.data().username}
						</p>
						<p className="flex-1">
							Deadline: {new Date(deadlineDate).toUTCString()}
						</p>
						<div className="w-full flex-1 gap-3 flex justify-center">
							<AddFeeBtn id={userId} username={username} />
							{!paid && <MarkFeePaidBtn feeId={fee.id} />}
						</div>
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

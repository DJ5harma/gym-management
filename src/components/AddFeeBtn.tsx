"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
const AddFeeBtn = ({ username, id }: { username: string; id: string }) => {
	const [confirm, setConfirm] = useState(false);
	const [feeForm, setFeeForm] = useState({
		amount: 0,
		deadline: -1, //in Days
		reason: "",
	});
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	async function addFee() {
		if (feeForm.amount <= 0)
			return toast.error("Amount should be more than 0!");
		if (feeForm.deadline <= 0) return toast.error("Deadline is invalid!");
		setLoading(true);
		toast.loading("Adding fee...");
		const { errMessage } = (
			await axios.post("/api/admin/addFee", {
				userId: id,
				username,
				...feeForm,
			})
		).data;
		toast.dismiss();
		setLoading(false);
		if (errMessage) return toast.error(errMessage);
		toast.success("Added fee!");
		setFeeForm({
			amount: 0,
			deadline: 0,
			reason: "",
		});
		setConfirm(false);
		router.refresh();
	}
	if (confirm)
		return (
			<div
				className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-45 z-20"
				onClick={() => {
					setConfirm(false);
					setFeeForm({
						amount: 0,
						deadline: -1,
						reason: "",
					});
				}}
			>
				<div
					className="flex p-4 rounded bg-blue-700 flex-col text-white gap-2"
					onClick={(e) => e.stopPropagation()}
				>
					<input
						value={feeForm.reason}
						onChange={(e) => setFeeForm({ ...feeForm, reason: e.target.value })}
						className="p-4 text-black rounded"
						placeholder="Reason..."
					/>
					<p className="font-semibold">
						Enter {username}
						{"'s"} fee (in Rs.)
					</p>
					<input
						type="number"
						value={feeForm.amount}
						onChange={(e) => {
							if (Number.isNaN(e.target.valueAsNumber))
								setFeeForm({ ...feeForm, amount: 0 });
							else setFeeForm({ ...feeForm, amount: e.target.valueAsNumber });
						}}
						placeholder="Type the id..."
						className="p-4 text-black rounded"
					/>
					<p>Deadline in days...</p>
					<input
						type="number"
						value={feeForm.deadline}
						onChange={(e) => {
							if (Number.isNaN(e.target.valueAsNumber))
								setFeeForm({ ...feeForm, deadline: 0 });
							else setFeeForm({ ...feeForm, deadline: e.target.valueAsNumber });
						}}
						className="p-4 text-black rounded"
					/>
					{!loading ? (
						<>
							{feeForm.amount > 0 && feeForm.deadline > 0 && (
								<button
									className="bg-blue-600 text-white p-2 rounded"
									onClick={addFee}
								>
									Add Fee
								</button>
							)}
							<button
								className=" text-white p-2 rounded"
								onClick={() => {
									setConfirm(false);
									setFeeForm({
										amount: 0,
										deadline: -1,
										reason: "",
									});
								}}
							>
								Cancel
							</button>
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		);
	return (
		<button
			className="bg-blue-600 text-white p-2 rounded"
			onClick={() => setConfirm(true)}
		>
			Add fee
		</button>
	);
};

export default AddFeeBtn;

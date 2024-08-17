"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
const MarkFeePaidBtn = ({ feeId }: { feeId: string }) => {
	const [confirm, setConfirm] = useState(false);
	const [loading, setLoading] = useState(false);

	async function markFeePaid() {
		setLoading(true);
		toast.loading("Marking fee...");
		const { errMessage } = (
			await axios.post("/api/admin/markFeePaid", { feeId })
		).data;
		toast.dismiss();
		setLoading(false);
		if (errMessage) return toast.error(errMessage);
		toast.success("Marked!");
		setConfirm(false);
	}
	if (confirm)
		return (
			<button
				className="bg-green-700 text-white p-2 rounded"
				onClick={markFeePaid}
			>
				{!loading ? "Tap to confirm" : "loading..."}
			</button>
		);
	return (
		<button
			className="bg-green-600 text-white p-2 rounded"
			onClick={() => setConfirm(true)}
		>
			Mark paid
		</button>
	);
};

export default MarkFeePaidBtn;

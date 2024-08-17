"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DeleteMemberBtn = ({
	username,
	id,
}: {
	username: string;
	id: string;
}) => {
	const [confirm, setConfirm] = useState(false);
	const [typedId, setTypedId] = useState("");
	const [loading, setLoading] = useState(false);

	async function deleteMember() {
		if (typedId !== id) return toast.error("id mismatch!");
		setLoading(true);
		toast.loading("Deleting member...");
		const { errMessage } = (
			await axios.post("/api/admin/deleteMember", { userId: id })
		).data;
		toast.dismiss();
		setLoading(false);
		if (errMessage) return toast.error(errMessage);
		toast.success("Deleted member!");
		setTypedId("");
		setConfirm(false);
	}
	if (confirm)
		return (
			<div
				className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-45 z-20"
				onClick={() => {
					setTypedId("");
					setConfirm(false);
				}}
			>
				<div
					className="flex p-4 rounded bg-red-700 flex-col text-white gap-2"
					onClick={(e) => e.stopPropagation()}
				>
					<p className="font-semibold">
						Type {"<" + id + ">"} to delete {"<" + username + ">"}
					</p>
					<input
						type="text"
						value={typedId}
						onChange={(e) => setTypedId(e.target.value)}
						placeholder="Type the id..."
						className="p-4 text-black rounded"
					/>
					{!loading ? (
						<>
							<button
								className="bg-red-600 text-white p-2 rounded"
								onClick={deleteMember}
							>
								Delete Member
							</button>
							<button
								className=" text-white p-2 rounded"
								onClick={() => {
									setConfirm(false);
									setTypedId("");
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
			className="bg-red-600 text-white p-2 rounded"
			onClick={() => setConfirm(true)}
		>
			Delete Member
		</button>
	);
};

export default DeleteMemberBtn;

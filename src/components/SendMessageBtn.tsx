"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SendMessageBtn = () => {
	const [confirm, setConfirm] = useState(false);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	async function sendMessage() {
		if (message.length < 6)
			return toast.error("Message should have atleast 6 characters!");
		setLoading(true);
		toast.loading("Sending message...");
		const { errMessage } = (
			await axios.post("/api/admin/sendMessage", { message })
		).data;
		toast.dismiss();
		setLoading(false);
		if (errMessage) return toast.error(errMessage);
		toast.success("Message sent!");
		setMessage("");
		setConfirm(false);
		router.refresh();
	}
	if (confirm)
		return (
			<div
				className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-45 z-20"
				onClick={() => {
					setConfirm(false);
					setMessage("");
				}}
			>
				<div
					className="flex p-4 rounded bg-blue-700 flex-col text-white gap-2"
					onClick={(e) => e.stopPropagation()}
				>
					<p>Message...</p>
					<input
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="p-4 text-black rounded"
						placeholder="atleast 6 chars"
					/>
					{!loading ? (
						<>
							{message.length >= 6 && (
								<button
									className="bg-blue-600 text-white p-2 rounded"
									onClick={sendMessage}
								>
									Send
								</button>
							)}
							<button
								className=" text-white p-2 rounded"
								onClick={() => {
									setConfirm(false);
									setMessage("");
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
			Send a message
		</button>
	);
};

export default SendMessageBtn;

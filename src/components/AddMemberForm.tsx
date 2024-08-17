"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddMemberForm() {
	const [user, setUser] = useState({
		userId: "",
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	async function addMember() {
		if (user.password.length < 8) return toast.error("Password too short!");
		if (user.password !== user.confirmPassword)
			return toast.error("Passwords must match!");
		if (!user.userId || !user.username)
			return toast.error("Please fill all the details!");
		setLoading(true);
		toast.loading("Adding new member...");
		const { errMessage } = (await axios.post("/api/admin/addMember", user))
			.data;
		toast.dismiss();
		setLoading(false);
		if (errMessage) return toast.error(errMessage);
		toast.success("Added new member!");
	}
	return (
		<div className="w-full h-full flex justify-center items-center flex-col gap-2">
			<h1>Add a new member</h1>
			<div className="border-2 p-4 gap-2 flex flex-col [&>input]:border-2 [&>input]:p-2 [&>input]:rounded rounded">
				<p>MemberId</p>
				<input
					onChange={(e) => setUser({ ...user, userId: e.target.value })}
					placeholder="must be unique"
					value={user.userId}
				/>
				<p>Member Username</p>
				<input
					onChange={(e) => setUser({ ...user, username: e.target.value })}
					placeholder="ask the member"
					value={user.username}
				/>
				<p>Password</p>
				<input
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					type="password"
					placeholder="atleast 8 chars"
					value={user.password}
				/>
				<p>Confirm Password</p>
				<input
					onChange={(e) =>
						setUser({ ...user, confirmPassword: e.target.value })
					}
					type="password"
					placeholder="same as password"
					value={user.confirmPassword}
				/>
			</div>
			<p>(Make sure the member has access to id and password)</p>
			<div className="flex gap-2">
				{!loading ? (
					<button
						onClick={addMember}
						className="border-2 p-2 rounded hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
					>
						Register this member
					</button>
				) : (
					<p>Loading...</p>
				)}
				<button
					onClick={() =>
						setUser({
							username: "",
							password: "",
							confirmPassword: "",
							userId: "",
						})
					}
					className="border-2 p-2 rounded hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
				>
					Clear form
				</button>
			</div>
		</div>
	);
}

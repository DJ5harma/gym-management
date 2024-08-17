"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
	const [userType, setUserType] = useState<"MEMBER" | "ADMIN">("MEMBER");
	const [user, setUser] = useState({
		userId: "",
		password: "",
	});
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	async function loginAdmin() {
		setLoading(true);
		toast.loading("Logging you in...");
		const { errMessage } = (await axios.post("/api/auth/admin", user)).data;
		setLoading(false);
		toast.dismiss();
		if (errMessage) return toast.error(errMessage);
		toast.success("Logged in as admin");
		router.push("/admin");
	}
	async function loginMember() {
		setLoading(true);
		toast.loading("Logging you in...");
		const { errMessage, username } = (
			await axios.post("/api/auth/member", user)
		).data;
		setLoading(false);
		toast.dismiss();
		if (errMessage) return toast.error(errMessage);
		toast.success("Logged in as " + username);
		router.push("/member");
	}

	return (
		<main className="w-full h-full flex justify-center items-center flex-col gap-2">
			<h1>{userType} LOGIN</h1>
			<div className="border-2 p-4 gap-2 flex flex-col [&>input]:border-2 [&>input]:p-2 [&>input]:rounded rounded">
				{userType === "MEMBER" && (
					<>
						<p>MemberId</p>
						<input
							onChange={(e) => setUser({ ...user, userId: e.target.value })}
							placeholder="ask your admin"
						/>
						<p>Password</p>
						<input
							onChange={(e) => setUser({ ...user, password: e.target.value })}
							type="password"
							placeholder="ask your admin"
						/>
					</>
				)}
				{userType === "ADMIN" && (
					<>
						<p>AdminId</p>
						<input
							onChange={(e) => setUser({ ...user, userId: e.target.value })}
							placeholder="ask the developer"
						/>
						<p>Password</p>
						<input
							onChange={(e) => setUser({ ...user, password: e.target.value })}
							type="password"
							placeholder="ask the developer"
						/>
					</>
				)}
			</div>
			{!loading ? (
				<button
					onClick={() => {
						if (userType === "ADMIN") loginAdmin();
						else if (userType === "MEMBER") loginMember();
					}}
					className="border-2 p-2 rounded hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
				>
					Login
				</button>
			) : (
				<p>Loading...</p>
			)}
			{userType !== "ADMIN" && (
				<button onClick={() => setUserType("ADMIN")}>Are you an Admin?</button>
			)}
			{userType !== "MEMBER" && (
				<button onClick={() => setUserType("MEMBER")}>Are you a Member?</button>
			)}
		</main>
	);
}

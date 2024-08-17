"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";

export interface CUser {
	username: string;
	userId: string;
	createdAt: number;
}
export const sampleUser: CUser = {
	username: "",
	userId: "",
	createdAt: NaN,
};
const context = createContext<{
	user: CUser;
	setUser: Dispatch<SetStateAction<CUser>>;
}>({
	user: sampleUser,
	setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<CUser>(sampleUser);
	const router = useRouter();

	const autoLogin = async () => {
		const cookies = document.cookie.split("=");
		let token = "";
		for (let i = 0; i < cookies.length; i++)
			if (cookies[i] === "token") {
				token = cookies[i + 1];
				break;
			}
		if (!token) router.push("/");
		toast.loading("Logging you in...");
		const { errMessage, user, userType } = (await axios.get("/api/auth")).data;
		toast.dismiss();
		if (!user || errMessage) return router.push("/");

		setUser(user);
		if (userType === "ADMIN") router.push("/admin");
		else if (userType === "MEMBER") router.push("/member");

		toast.success(`Logged in automatically as ${user.username}`);
	};
	useEffect(() => {
		if (window.location.href.endsWith("/auth")) return;
		autoLogin();
	}, []);
	return (
		<context.Provider value={{ user, setUser }}>{children}</context.Provider>
	);
};

export const useUser = () => {
	return useContext(context);
};

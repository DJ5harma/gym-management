import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function verifyJwt() {
	const token = cookies().get("token")?.value;
	if (!token) return {};

	const { userId, userType } = jwt.verify(token, process.env.JWT_SECRET!) as {
		userId: string;
		userType: "ADMIN" | "MEMBER";
	};
	return { userId, userType };
}
export function signJwt(userId: string, userType: "ADMIN" | "MEMBER") {
	const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET!);
	cookies().set("token", token);
}

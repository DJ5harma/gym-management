import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		const token = cookies().get("token")?.value;
		if (!token) throw new Error("Auth token not found");
		const { err, userId, userType } = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as {
			userId: string;
			userType: "ADMIN" | "MEMBER";
			err: Error;
		};
		if (!userType || err || !token) redirect("/");

		if (userType === "ADMIN")
			return NextResponse.json({
				user: { username: "Admin", userId },
				userType,
			});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

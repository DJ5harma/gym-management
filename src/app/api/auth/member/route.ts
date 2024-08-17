import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
	try {
		const { password, userId } = await req.json();
		const token = jwt.sign(
			{ userId, userType: "MEMBER" },
			process.env.JWT_SECRET!
		);
		cookies().set("token", token);
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

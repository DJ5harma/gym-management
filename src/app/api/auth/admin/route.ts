import { NextRequest, NextResponse } from "next/server";
import { signJwt } from "@/lib/jwt";

export const POST = async (req: NextRequest) => {
	try {
		const { password, userId } = await req.json();
		if (userId !== process.env.ADMIN_ID) throw new Error("Wrong Admin Id");
		if (password !== process.env.ADMIN_PASSWORD)
			throw new Error("Wrong Admin Password");
		signJwt(userId, "ADMIN");
		return NextResponse.json({ user: { username: "Admin", userId } });
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

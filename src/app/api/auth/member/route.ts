import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { compareSync } from "bcrypt";
import { signJwt } from "@/lib/jwt";

export const POST = async (req: NextRequest) => {
	try {
		const { password, userId } = await req.json();
		const userDoc = await getDoc(doc(db, "members", userId));
		if (!userDoc.exists()) throw new Error("Member not found");

		const user = userDoc.data();
		if (!compareSync(password, user.hashedPassword))
			throw new Error("Wrong password");

		signJwt(userId, "MEMBER");
		return NextResponse.json({
			userId,
			username: user.username,
			createdAt: user.createdAt,
		});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

import { db } from "@/lib/firebase";
import { verifyJwt } from "@/lib/jwt";
import { genSaltSync, hashSync } from "bcrypt";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const { userType } = verifyJwt();
		if (userType !== "ADMIN")
			throw new Error("Only admins can perform this action");
		const { password, userId, username, confirmPassword } = await req.json();
		if (password !== confirmPassword) throw new Error("Passwords must match");
		if (!username || !userId) throw new Error("Please fill all the fields");
		const hashedPassword = hashSync(password, genSaltSync(10));

		const docRef = doc(db, "members", userId);
		if ((await getDoc(docRef)).exists())
			throw new Error(`User with id ${userId} already registered`);
		await setDoc(docRef, {
			username,
			hashedPassword,
			createdAt: Date.now(),
		});
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

import { db } from "@/lib/firebase";
import { verifyJwt } from "@/lib/jwt";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const { userType } = verifyJwt();
		if (userType !== "ADMIN")
			throw new Error("Only admins can perform this action");
		const { userId, username, deadline, amount, reason } = await req.json();

		const deadlineDate = Date.now() + deadline * 24 * 60 * 60 * 1000;
		await addDoc(collection(db, "fees"), {
			amount,
			reason,
			deadlineDate,
			userId,
			username,
			paid: false,
		});
		revalidatePath("/admin/fees");
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

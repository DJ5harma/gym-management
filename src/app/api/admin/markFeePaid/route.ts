import { db } from "@/lib/firebase";
import { verifyJwt } from "@/lib/jwt";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const { userType } = verifyJwt();
		if (userType !== "ADMIN")
			throw new Error("Only admins can perform this action");
		const { feeId } = await req.json();

		const feeRef = doc(db, "fees", feeId);
		const feeDoc = await getDoc(feeRef);
		if (!feeDoc.exists()) throw new Error("Fee not found");
		await updateDoc(feeRef, { paid: true });
		revalidatePath("/admin/fees");
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

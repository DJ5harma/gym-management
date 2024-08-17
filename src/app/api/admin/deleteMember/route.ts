import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const { userId } = await req.json();

		const docRef = doc(db, "members", userId);
		await deleteDoc(docRef);
		revalidatePath("/admin/members");
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

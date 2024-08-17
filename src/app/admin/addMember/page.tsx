import AddMemberForm from "@/components/AddMemberForm";
import ErrorComponent from "@/components/ErrorComponent";
import { verifyJwt } from "@/lib/jwt";
import React from "react";

export default function page() {
	const { userType } = verifyJwt();
	if (userType !== "ADMIN") return <ErrorComponent />;
	return <AddMemberForm />;
}

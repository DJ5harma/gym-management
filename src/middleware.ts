import { NextResponse } from "next/server";

export default async function middleware(req: Request) {
	return NextResponse.next();
}

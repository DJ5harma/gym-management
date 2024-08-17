import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/providers/UserProvider";
import NavButtons from "@/components/NavButtons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Gym Management",
	description: "By Dhananjay Sharma",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster />
				<UserProvider>
					<NavButtons />
					<div className="w-screen h-screen">{children}</div>
				</UserProvider>
			</body>
		</html>
	);
}

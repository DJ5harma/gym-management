import React from "react";

const ErrorComponent = ({ message }: { message?: string }) => {
	return (
		<div className="w-full h-full flex-col flex items-center justify-center">
			{message || "Page access denied"}
		</div>
	);
};

export default ErrorComponent;

"use client";
import React, { useState } from "react";
const AddFeeBtn = ({ username, id }: { username: string; id: string }) => {
	return (
		<button className="bg-blue-600 text-white p-2 rounded">Add Fee</button>
	);
};

export default AddFeeBtn;

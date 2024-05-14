// @ts-nocheck
import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";

export const POST = async (request) => {
  try {
    await dbConnect();
    const data = await request.json();
    console.log(data, "user id");
    const users = await  User.findByIdAndDelete(data.userId)

    // Passwords match, login successful
    return NextResponse.json({ message: "success", data:"user deleted success" });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Something went wrong in get user ",
    });
  }
};

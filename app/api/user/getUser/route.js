// @ts-nocheck
import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";

export const POST = async (request) => {
  try {
    await dbConnect();
    const data = await request.json();
    console.log(data, "user id");
    const user = await User.findById(data.userId)

    // Passwords match, login successful
    return NextResponse.json({ message: "success", data: user });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Something went wrong in get user ",
    });
  }
};

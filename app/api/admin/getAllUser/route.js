// @ts-nocheck
import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";

export const POST = async (request) => {
  try {
    await dbConnect();
    const data = await request.json();
    console.log(data, "user id ----------------------");
    const users = await User.find({ _id: { $ne: data?.userId } });
    // const users = await  User.find()

    // Passwords match, login successful
    return NextResponse.json({ message: "success", data: users });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Something went wrong in get user ",
    });
  }
};

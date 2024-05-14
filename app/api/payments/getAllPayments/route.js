import Payments from "../../../../server/modal/Payments";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";

// @ts-ignore
export const POST = async (request) => {
  try {
    await dbConnect();
    const { userId } = await request.json();

    console.log(userId, "user id ========");
    const payments = await Payments.find();
    console.log(payments, "payments");
    // Passwords match, login successful
    return NextResponse.json({ message: "success", Payments: payments });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Something went wrong in get user ",
    });
  }
};

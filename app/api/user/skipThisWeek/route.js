// @ts-nocheck
import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { weekDates, userId } = await request.json();
    console.log(weekDates, userId, " req chali");

    const user = await User.findById(userId);

    let cleanings = user.cleanings;

    let startIndex = cleanings.findIndex(
      (cleaning) => cleaning.date === weekDates
    );

    if (startIndex !== -1) {
      for (
        let i = startIndex;
        i < Math.min(startIndex + 7, cleanings.length);
        i++
      ) {
        cleanings[i].skip = true;
      }
    }

    // Mark the modified path explicitly
    user.markModified('cleanings');

    await user.save();
    console.log(user.cleanings, "cleanings");
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Something went wrong in add cleaning",
    });
  }
};

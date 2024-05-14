// @ts-nocheck
import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";
import moment from "moment";
moment().format();
export const POST = async (request) => {
  try {
    await dbConnect();
    const data = await request.json();
    console.log(data, "user id in get today");

    const user = await User.find();

    const currentDate = new Date();

    // Extract day, month, and year from the current date
    const day = currentDate.getDate() + 1;
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = currentDate.getFullYear();

    // Format the date components to DD/MM/YYYY format
    const formattedDate = `${month.toString()}/${day.toString()}/${year}`;

    console.log("Formatted Date:", formattedDate);

    const tomorrowCleanings = [];

    user.forEach((user) => {
      user.cleanings.forEach((cleaning) => {
        if (cleaning.date === formattedDate.toString()) {
          console.log(cleaning.date, formattedDate.toString());
          let obj={...cleaning,name:user.username,email:user.email}
          tomorrowCleanings.push(obj);
        }
      });
    });

    return NextResponse.json({ message: "success", data: tomorrowCleanings });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: "Something went wrong in update user ",
    });
  }
};

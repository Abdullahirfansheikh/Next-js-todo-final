// @ts-nocheck
import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";
export const POST = async (request) => {
    try {
      await dbConnect();
      const data = await request.json();
      console.log(data, "user id");
      
      const user = await User.findById(data.userId);
      
      const updatedIsBlock = !user.isBlock;
      
      const updatedUser = await User.findByIdAndUpdate(data.userId, { isBlock: updatedIsBlock }, { new: true });
  
      return NextResponse.json({ message: "success", data: "user updated successfully" });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
        message: "Something went wrong in update user ",
      });
    }
  };
  

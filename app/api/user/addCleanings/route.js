// @ts-nocheck

import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";
import { use } from "react";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { plan, userId, time, note, service } = await request.json();
    console.log(plan, userId, " req chali");
    const user = await User.findById(userId);
    console.log(user, "user found");
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: "error",
      });
    }
    console.log(
      user.plan,
      "user purchages plan",
      user.plan.some((item) => item.service === service),
      "service"
    );
    const currentDate = new Date();
    if (
      user.plan.length > 0 &&
      user.plan.some((item) => item.service === service)
    ) {
      return NextResponse.json({
        status: "error",
        message: "Already purchased this plan",
      });
    }


    // let currentDate = new Date();

    const futureDate = new Date(currentDate);
    if (plan == "Quick") {
      futureDate.setDate(currentDate.getDate() + 1);
    } else if (plan == "Weekly") {
      futureDate.setDate(currentDate.getDate() + 7);
    } else {
      futureDate.setDate(currentDate.getDate() + 30);
    }
    user.plan.push({
      plan: plan,
      service: service,
      planEndDate: futureDate,
      planStartDate: new Date(),
    });
    await user.save();

    // user.cleanings = []
    const newCleanings = [];
    console.log("🚀 ~ POST ~ newCleanings:", newCleanings);

    if (plan === "Quick") {
      // if (user.cleanings.length > 0) {
      //   newCleanings.push(...user.cleanings);
      // }
      newCleanings.push({
        date: currentDate.toLocaleDateString(),
        time: time,
        status: "pending",
        id: 1,
        address: user.address,
        note: note,
        service: service,
      });
    } else if (plan === "Weekly") {
      for (let i = 0; i < 7; i++) {
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + i);
        newCleanings.push({
          date: futureDate.toLocaleDateString(),
          status: "pending",
          id: i + 1,
          time: time,
          address: user.address,
          note: note,
          service: service,

          skip: false,
        });
      }
    } else if (plan === "Monthly") {
      for (let i = 0; i < 31; i++) {
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + i);
        newCleanings.push({
          date: futureDate.toLocaleDateString(),
          status: "pending",
          id: i + 1,
          time: time,
          address: user.address,
          note: note,
          service: service,

          skip: false,
        });
      }
    }
    console.log("🚀 ~ POST ~ newCleanings: after", newCleanings);

    user.cleanings.push(...newCleanings);
    await user.save();

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({
      error: error,
      message: "Something went wrong in add cleaning",
    });
  }
};

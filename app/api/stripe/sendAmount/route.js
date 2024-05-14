// import stripePackage from "stripe";

// const stripe =new stripePackage(process.env.STRIPE_KEY);

// import { NextResponse } from "next/server";
// import dbConnect from "../../../../server/utils/dbConnect";

// // @ts-ignore
// export const POST = async (request) => {
//   try {
//     await dbConnect();
//     // const {amount,currency} =await request.json();
//     let amount = 100;
//     let currency = "usd";
//     console.log(stripe,"stripe");
//     const customer = await stripe.customers.create();
//     // console.log(customer,"customer created",stripe);
//     const ephemeralKey = await stripe.ephemeralKeys.create(
//       { customer: customer.id },
//       { apiVersion: "2022-11-15" }
//     );
//     console.log(ephemeralKey,"key created");

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: currency,
//       customer: customer.id,
//       payment_method_types: ["card"],
//     });
//     console.log(paymentIntent,"paymentIntent created");

//     return NextResponse.json({
//       message: "success",
//       paymentIntent: paymentIntent.client_secret,
//       ephemeralKey: ephemeralKey.secret,
//       customer: customer.id,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       error: "Something went wrong in server login ",
//     });
//   }
// };

const stripe = new stripePackage(
  "sk_test_51OkYYqJGy3aGGBUOzw2nvdsBNo6dhPHDLTaKKufLY6QUkws2YLZqdgY7CKqzcCf2ISW9uyEODC8bt3aqYIRKmWys004ebVGSb4"
);
import stripePackage from "stripe";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";
import Payments from "../../../../server/modal/Payments";
import User from "@/server/modal/User";

// @ts-ignore
export const POST = async (request) => {
  try {
    await dbConnect();
    const { price, userId,serviceName,time,day, username,priceSuffix, email } = await request.json();
    console.log("🚀 ~ POST ~ price:", price)
    console.log("🚀 ~ POST ~ userId:", userId)
    let currency = "usd";

    const customer = await stripe.customers.create({
      name: username,
      email: email,
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2023-10-16" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: currency,
      customer: customer.id,
      payment_method: "pm_card_visa",
      payment_method_types: ["card"],
    });


    const payment = new Payments({
      name: username,
      email: email,
      userId: userId,
      amount: price,
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
    const user = await User.findById(userId);
    console.log(user, "user found");
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: "error",
      });
    }
    // @ts-ignore
    const conflictingCleaning = user.cleanings.find(clean => clean.time === time);

    if ( conflictingCleaning) {
      let errorMessage = "";
     
      if (conflictingCleaning) {
        errorMessage = "There is a conflicting cleaning scheduled at the same time";
      }
      return NextResponse.json({
        status: "error",
        message: errorMessage,
      });
    }

    user.plan.push({
      plan: priceSuffix,
      service: serviceName,
    });
    user.cleanings.push({
      time: time,
      day: day,
      status: "pending",
      address: user.address,
      service: serviceName,
      plan: priceSuffix,
    })
    await user.save();

    const res = await payment.save();
    console.log(res,"response while storing payment");
    return NextResponse.json({
      message: "success",
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Something went wrong in server login",
    });
  }
};

// @ts-nocheck

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"; // Import Axios
import React from "react";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeCheckoutForm = (props) => {
  console.log(props, "amount in the props");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("stripe method called", event);

    if (!stripe || !elements) {
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      console.log(userId, "user id");
      // const header = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      const response = await axios.post(
        "/api/stripe/sendAmount",
        { amount: props.amount, userId: userId },
        {
          headers: { "Content-Type": "application/json" }, // Set headers
        }
      );
      if (response.data.message == "success") {
        toast.success("payment sent success");
        props.setPaymentSendSuccess(true);
        props.setModal(false);
      } else {
        toast.error("something went wrong");
      }
      // if (response.data.session) {
      //   stripe.redirectToCheckout({ sessionId: response.data.session.id });
      // }
    } catch (error) {
      console.log(error, "payment error");
      throw error;
    } finally {
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[500px] h-[250px]  ">
        <form
          className="flex flex-col justify-between h-full w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="flex justify-between w-full marker:text-[24px] font-semibold text-gray-600">
              <p> Card details</p>
              <XMarkIcon
                onClick={() => props.setModal(false)}
                className="h-[24px] w-[24px] text-black cursor-pointer"
              />
            </label>
            <CardElement className="mt-[20px] p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

const StripeCheckout = (props) => {

  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm amount={props.amount} setModal={props.setModal} setPaymentSendSuccess={props.setPaymentSendSuccess} />
    </Elements>
  );
};

export default StripeCheckout;

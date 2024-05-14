// @ts-nocheck
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StripeCheckout from "@/components/StripeCheckout/StripeCheckout";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { addCleanings } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { set } from "mongoose";
import axios from "axios";
import CalendarComponent from '../../components/CalendarComponent';




function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isCardAdded, setIsCardAdded] = useState(false);
  const [paymentSendSuccess, setPaymentSendSuccess] = React.useState(false);
  // const searchParams = useSearchParams();
  // const planNameParams = searchParams.get("planName");
  const [plan, setPlan] = useState("");
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [note, setNote] = useState("");
  console.log("🚀 ~ Page ~ plan:", plan);
  console.log("isCardAdded", isCardAdded);
  console.log("paymentSendSuccess", paymentSendSuccess);
  // const [seletedPlanName, setseletedPlanName] = useState(planNameParams || '')
  // console.log('🚀 ~ Page ~ seletedPlanName:', seletedPlanName)
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/login");
    }
  }, []);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const addCleaningFun = async () => {
    if (service === "") {
      toast.error("Please select a service");
      return
    } 
  else  if (plan === "") {
      toast.error("Please select a plan");
      return
    } 
    if (time === "") {
      toast.error("Please select a time");
      return
    } 
    else if (!isCardAdded) {
      toast.error(
        "Please add a card before confirming the order.Make sure Payment is done"
      );
      return
    } else {
      try {
        const userId = localStorage.getItem("userId");
        console.log(plan, userId, " req chali");
        const response = await dispatch(addCleanings({plan,time,note,service}));
        console.log(response, "response");
        if (response.payload.status === "error") {
          toast.error(response.payload.message);
        } else {
          toast.success("Order Confirmed Successfully");
          router.push("/userDashboard");
          setIsCardAdded(false);
          setPaymentSendSuccess(false);
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
  };
  function generateTimeOptions() {
    const options = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute of ["00", "30"]) {
        const time = `${hour < 10 ? "0" + hour : hour}:${minute}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  }
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
          { amount: (service === "Bin Clean" && plan==="Quick" && 30) ||
          (service === "Bin Clean" && plan==="Weekly" && 210) ||
          (service === "Bin Clean" && plan==="Monthly" && 900) ||
          (service === "Car Wash" && plan==="Quick" && 30) ||
          (service === "Car Wash" && plan==="Weekly" && 210) ||
          (service === "Car Wash" && plan==="Monthly" && 900) ||
          (service === "Commercial Cleaning" && plan==="Quick" && 30) ||
          (service === "Commercial Cleaning" && plan==="Weekly" && 210) ||
          (service === "Commercial Cleaning" && plan==="Monthly" && 900), userId: userId },
          {
            headers: { "Content-Type": "application/json" }, // Set headers
          }
        );
        if (response.data.message == "success") {
          toast.success("payment sent success");
          props.setPaymentSendSuccess(true);
          props.setIsCardAdded(true);
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
  return (
    <div
      style={{
        backgroundImage: `url("/cleaning-tools-hero.jpeg")`,
        backgroundSize: "cover",
      }}
      className=" flex flex-col  justify-center h-screen items-center"
    >
      <p className="text-center text-[40px] font-semibold mb-4">
        Confirm Your Order
      </p>
      <select
        name="cleanType"
        id=""
        type="text"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="p-5 mb-2 rounded-2xl w-[50%] "
      >
        <option value="">Choose a Service</option>
        <option value="Bin Clean">Bin Clean</option>
        <option value="Car Wash">Car Wash</option>
        <option value="Commercial Cleaning">Commercial Cleaning</option>
      </select>

      <select
        name="cleanType"
        id=""
        type="text"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        className="p-5 mb-2 rounded-2xl w-[50%] "
      >
        <option value="">Choose a Plan</option>
        <option value="Quick">Quick</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>

      <select
        name="cleaning time"
        id=""
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-5 mb-2 rounded-2xl w-[50%] "
      >
        <option value="">Choose a Time</option>
        {generateTimeOptions()}
      </select>
      <div className="container mx-auto p-10">
      <h1 className="text-3xl mb-4">Select Cleaning Day</h1>
      <CalendarComponent />
    </div>
      <div className="w-[50%] flex justify-between flex-wrap items-start gap-[40px] p-[40px] bg-[#fff] rounded-[24px]">
        <div className="flex flex-col items-start  gap-[10px]">
          <p className="text-black font-poppins text-[34px] font-medium">
            Fee Charges
          </p>
          <div className="flex items-center justify-center  gap-[12px]">
            <CurrencyDollarIcon className="h-[40px] w-[40px] text-blue-500" />
            <p className="text-[#589CFF] font-poppins text-[64px] font-semibold">
              {(service === "Bin Clean" && plan==="Quick" && 30) ||
                (service === "Bin Clean" && plan==="Weekly" && 210) ||
                (service === "Bin Clean" && plan==="Monthly" && 900) ||
                (service === "Car Wash" && plan==="Quick" && 30) ||
                (service === "Car Wash" && plan==="Weekly" && 210) ||
                (service === "Car Wash" && plan==="Monthly" && 900) ||
                (service === "Commercial Cleaning" && plan==="Quick" && 30) ||
                (service === "Commercial Cleaning" && plan==="Weekly" && 210) ||
                (service === "Commercial Cleaning" && plan==="Monthly" && 900) ||
                (plan === "" && 0)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[10px] w-[336px] h-auto">
          <img
            src="/paymentCard.png"
            alt="picture"
            className="border border-blue-400 rounded-xl"
          />
          <div className="flex justify-center items-center self-stretch gap-[10px]">
            <button
              onClick={() => setModal(true)}
              className="flex justify-center items-center py-[4px] px-[8px] gap-[4px] border-1 border-[#4989E6] rounded-[4px] bg-[#589CFF] shadow-[rgba(0, 0, 0, 0.10)]"
            >
              <p className="font-poppins text-white text-[14px] font-semibold text-center whitespace-nowrap">
                Add card
              </p>
            </button>
            {/* <button className='flex justify-center items-center py-[4px] px-[8px] gap-[4px] border-1 border-[#4989E6] rounded-[4px] bg-[#589CFF] shadow-[rgba(0, 0, 0, 0.10)]'>
              <p className='font-poppins text-white text-[14px] font-semibold text-center whitespace-nowrap'>
                Remove card
              </p>
            </button> */}
            {/* <button className='flex gap-4'>
              <ChevronLeftIcon className='h-[30px] w-[30px] ' />
              <ChevronRightIcon className='h-[30px] w-[30px] ' />
            </button> */}
          </div>
        </div>
      </div>
      <div className="w-[50%] mt-5 flex ">
        <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
          type="text"
          placeholder="Enter you note"
          className="w-full p-5 rounded-xl bg-[#fff]"
        />
      </div>
      <div className="w-[50%] mt-5 flex ">
        <button
          onClick={addCleaningFun}
          disabled={plan === "" && isCardAdded}
          className={` font-poppins bg-blue-500 px-8 py-2 rounded-lg text-white text-[20px] font-semibold text-center whitespace-nowrap`}
        >
          Confirm Order
        </button>
      </div>

      <div className="">
        {modal && (
          <Elements stripe={stripePromise}>
            <StripeCheckoutForm
              amount={
                (plan === "Bin Clean" && 30) ||
                (plan === "Car Wash" && 30) ||
                (plan === "Commercial Cleaning" && 3) ||
                (plan === "" && 0)
              }
              setModal={setModal}
              setPaymentSendSuccess={setPaymentSendSuccess}
              setIsCardAdded={setIsCardAdded}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Page;

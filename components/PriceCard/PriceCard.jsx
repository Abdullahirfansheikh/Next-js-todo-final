// @ts-nocheck

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import toast from 'react-hot-toast'
import CalendarComponent from "../CalendarComponent"
import { useRouter } from 'next/router'
const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'once', label: 'once', priceSuffix: '/year' },
]
const tiers = [
  {
    name: 'Clean Bin',
    id: 'tier-CleanBin',
    href: '#',
    price: { monthly: '5', once: '15' },
    description: 'The essentials to provide your best work for clients.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    mostPopular: false,
  },
  {
    name: 'Car Wash',
    id: 'tier-CarWash',
    href: '#',
    price: { monthly: '30', once: '60' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    mostPopular: true,
  },
  {
    name: 'Commercial Cleaning',
    id: 'tier-CommercialCleaning',
    href: '#',
    price: { monthly: '60', once: '90' },
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools',
    ],
    mostPopular: false,
  },
]

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [frequency, setFrequency] = useState(frequencies[0])
  const [time, setTime] = useState("");
  const [days, setDays] = useState("");
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [day,setDay] = useState('')


  const stripePromise = loadStripe("pk_test_51OkYYqJGy3aGGBUOsF2Riv3bxAI4yyufUOG0Tt1n2apNGlUDmdoywyGpsBZdSds0qX3ox3RXIiVrWwQ4sqJtRoYn00HAS5ewJW");
  console.log("amount in the props");





  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!stripe || !elements) {
      toast.error("Add Stripe Number")
      return; // If Stripe or Elements instance is not available, exit early
    }

    try {
      setPaymentLoading(true)
      // @ts-ignore
      const storedData = JSON.parse(localStorage.getItem('selectedPlan'));
      const userId = localStorage.getItem("userId");
      console.log("🚀 ~ handleSubmit ~ storedData:", storedData)
      const { name, price, priceSuffix, time, id } = storedData;

      const response = await axios.post("/api/stripe/sendAmount", {
        serviceName:name,
        price,
        priceSuffix,
        time,
        id,
        username,
        email,
        userId
      });
      console.log("🚀 ~ handleSubmit ~ response:", response)

      if (response.data.message === "success") {
        toast.success("Payment sent successfully");
        props.setModal(false); // Close the modal
      } else {
        toast.error(response.data.message);
      }
      setPaymentLoading(false)
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      // If an error occurs during the payment process, log the error
      console.error("Payment error:", error);
      toast.error("Something went wrong");
      setPaymentLoading(false)

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
  function generateDayOptions() {
    const days = ["Saturday", "Sunday"];
    return days.map((day, index) => (
      <option key={index} value={day}>
        {day}
      </option>
    ));
  }

  // @ts-ignore
  const handleBuyPlan = (tier) => {
    if (!time) {
      // Show an error message if time is not selected
      toast.error("Please choose a time");
      return;
    }
    if(!day){
      toast.error("Please choose a cleaning day");
      return;
    }
    // Construct data object
    const data = {
      name: tier.name,
      price: tier.price[frequency.value],
      priceSuffix: frequency.priceSuffix,
      time,
      day,
      id: tier.id
    };
    // Check if a time is selected


    // Save data to localStorage
    localStorage.setItem('selectedPlan', JSON.stringify(data));

    // Open the modal
    setModal(true);
  };


  // @ts-ignore
  // const StripeCheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
  
    const storedData = localStorage.getItem('selectedPlan');
    console.log("🚀 ~ StripeCheckoutForm ~ storedData:", storedData)

    // return (
      
  //   );
  // };
  return (
    <div className="bg-white py-24 sm:py-32">
        {modal && (
          <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "1000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          
          }}>
          
          <div className="fixed inset-0   bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-2xl w-[500px] h-[350px]  ">
          <form
            className="flex flex-col justify-between h-full w-full"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="flex justify-between w-full marker:text-[24px] font-semibold text-gray-600">
                <p> Card details</p>
                <XMarkIcon
                  onClick={() => setModal(false)}
                  className="h-[24px] w-[24px] text-black cursor-pointer"
                />
              </label>
              <div className='mt-9'>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Enter your username"
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                      placeholder="Enter your email"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <CardElement className="mt-[20px] p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {paymentLoading ? "Paying..." : "Pay"}
            </button>
          </form>
        </div>
      </div>
          </div>
        )}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{
                  // @ts-ignore
                  tier.price[frequency.value]}$</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">{frequency.priceSuffix}</span>
              </p>

              <select
                // @ts-ignore
                name="cleaning time"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-2 my-2 rounded-2xl w-[100%] "
              >
                <option value="">Choose a Time</option>
                {generateTimeOptions()}
              </select>
              <div className="container mx-auto p-10 flex">
                <p className="text-md font-normal text-center flex-1">Choose a day</p>
      <CalendarComponent />
    </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  handleBuyPlan(tier)}} // Call handleBuyPlan with tier data

              >
                Buy plan
              </a>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

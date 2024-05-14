// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Oval } from "react-loader-spinner";
import {
  getPayments,
  getUserDetails,
  setUser,
  setUserLogin,
  skipThisWeek,
} from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
// const events = [
//   { title: 'Meeting', start: new Date() }
// ]

import {
  BeakerIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import { SidebarItem } from "../../components/DashboardSidebar/DashboardSidebar";
import CleaningCard from "../../components/CleaningCard/CleaningCard";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import moment from "moment";
// import CleanBinImg from '../../public/priceCard1.png'
import axios from "axios";
import CleaningList from "../../components/CleaningCard/CleaningCard";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  const [activeItem, setActiveItem] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tomorrowCleaningState, setTomorrowCleaning] = useState([]);
  console.log("🚀 ~ Page ~ tomorrowCleaningState:", tomorrowCleaningState)
  const [previousCleaningState, setPreviousCleaning] = useState({});
  const [cleaningHistoryState, setCleaningHistory] = useState([]);
  const { user, isUserLogin } = useSelector((store) => store.userSlice);
  console.log("🚀 ~ Page ~ isUserLogin:", isUserLogin)
  const [skip, setSkip] = useState(false);
  const [dates, setDates] = useState([]);
  const [services,setServices] = useState(["Bin Clean","Car Wash","Commercial Cleaning"]);
  console.log(user, "user detail");

  const getWeekWiseDate = (cleanings) => {
    let dateArr = [];
    let checkForSkip = cleanings.some((cleaning) => {
      return cleaning.skip === true;
    });
    if (checkForSkip) {
      setSkip(true);
    }
    cleanings.map((cleaning) => {
      console.log(cleaning.date, cleaning.id);

      if (cleaning.id === 1) {
        let obj = { date: cleaning.date, skip: cleaning.skip };

        dateArr.push(obj);
      } else if (cleaning.id === 8) {
        let obj = { date: cleaning.date, skip: cleaning.skip };

        dateArr.push(obj);
      } else if (cleaning.id === 15) {
        let obj = { date: cleaning.date, skip: cleaning.skip };

        dateArr.push(obj);
      } else if (cleaning.id === 22) {
        let obj = { date: cleaning.date, skip: cleaning.skip };

        dateArr.push(obj);
      } else if (cleaning.id === 29) {
        let obj = { date: cleaning.date, skip: cleaning.skip };

        dateArr.push(obj);
      }
    });
    const formattedDates = dateArr.map((date) => {
      return {
        date: moment(date.date, "M/D/YYYY").format("YYYY-MM-DD"),
        skip: date.skip,
      };
    });
    setDates(formattedDates);
    console.log(dateArr, "date geted form array", formattedDates);
  };

  const skipThisWeekFun = async () => {
    try {
      let weekDate = "";
      let currentDate = new Date();
      const tomorrowDate = new Date(currentDate);
      tomorrowDate.setDate(currentDate.getDate() + 1);
      let skippedArr = dates.map((date) => {
        let ourDate = new Date(date.date);

        if (tomorrowDate >= ourDate) {
          weekDate = date.date;
          return { date: date.date, skip: true };
        } else {
          return date;
        }
      });

      let res = await dispatch(
        skipThisWeek(moment(weekDate, "YYYY-MM-DD").format("M/D/YYYY"))
      );
      if (res.payload.message == "success") {
        setSkip(true);
        setDates(skippedArr);
        console.log("==============");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/login");
    } else {
      dispatch(setUserLogin(true));
    }
  }, []);
  useEffect(() => {
    const getUserDetail = async () => {
      try {
        // @ts-ignore
        let user = await dispatch(getUserDetails());
        console.log("🚀 ~ getUserDetail ~ user:", user)

        let weekDate = getWeekWiseDate(user?.payload?.data?.cleanings);

        const tomorrowCleaning =
        //  getTomorrowDateObject(
          user?.payload?.data?.cleanings
        // );
        console.log("tomorrowCleaningtomorrowCleaningtomorrowCleaningtomorrowCleaning",tomorrowCleaning)
        const previousCleaning = getPreviousDateObject(
          user?.payload?.data?.cleanings
        );
        console.log("🚀 ~ getUserDetail ~ previousCleaning:", previousCleaning);
        const cleaningHistory = getCleaningsBeforeCurrentDate(
          user?.payload?.data?.cleanings
        );
        dispatch(setUser(user.payload));
        setTomorrowCleaning(tomorrowCleaning);
        setPreviousCleaning(previousCleaning);
        setCleaningHistory(cleaningHistory);
        getPaymentHistory();
      } catch (error) {
        console.error(error, "error fetching user");
      }
    };
    if (isUserLogin) {
      getUserDetail();
    }
  }, [isUserLogin,activeItem]);
  // @ts-ignore

  useEffect(() => {
    // Simulate loading delay (replace with actual data fetching logic)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [paymentHistory, setPaymentHistory] = useState([]);

  console.log(user, "user detail");


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  // @ts-ignore
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  // @ts-ignore
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  const item = {
    date: "12/10/1010",
    time: "9 PM",
    address: "faisalabad punjab",
    note: "this is not form user",
    title: "Next Cleaning",
  };
  const item1 = {
    date: "12/10/1010",
    time: "9 PM",
    address: "faisalabad punjab",
    note: "this is not form user",
    title: "Previous Cleaning",
  };

  function getTomorrowDateObject(cleanings) {
    console.log("🚀 ~ getTomorrowDateObject ~ cleanings:", cleanings)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return cleanings.find((cleaning) => {
      const cleaningDate = new Date(cleaning.time);
      console.log("🚀 ~ returncleanings.find ~ cleaningDate:", cleaningDate)
      return (
        cleaningDate.getDate() === tomorrow.getDate() &&
        cleaningDate.getMonth() === tomorrow.getMonth() &&
        cleaningDate.getFullYear() === tomorrow.getFullYear()  && cleaning.service===services[activeItem]
      );
    });
  }

  function getPreviousDateObject(cleanings) {
    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 1);

    return cleanings.find((cleaning) => {
      const cleaningDate = new Date(cleaning.date);
      return (
        cleaningDate.getDate() === previousDate.getDate() &&
        cleaningDate.getMonth() === previousDate.getMonth() &&
        cleaningDate.getFullYear() === previousDate.getFullYear()&& cleaning.service===services[activeItem]
      );
    });
  }

  function getCleaningsBeforeCurrentDate(cleanings) {
    const currentDate = new Date();
    return cleanings.filter((cleaning) => {
      const cleaningDate = new Date(cleaning.date);

      return cleaningDate < currentDate;
    });
  }

  const getPaymentHistory = async () => {
    try {
      let res = await dispatch(getPayments());
      console.log(
        res,
        "============================payments==================="
      );
      setPaymentHistory(res.payload.data.Payments);
    } catch (error) {
      console.log(error, "error white geting paymetns");
    }
  };

  return (
    <div className="flex justify-between items-start">
      <div className="w-[20%] max-sm:w-[10%]">
        <Sidebar>
          <SidebarItem
            icon={"/priceCard1.png"}
            text="Bin Clean"
            active={activeItem === 0}
            onClick={() => handleItemClick(0)}
            alert={activeItem === 0}
          />
          <SidebarItem
            icon={"./priceCard2.png"}
            text="Car Wash"
            alert={activeItem === 1}
            active={activeItem === 1}
            onClick={() => handleItemClick(1)}
          />
          <SidebarItem
            icon={"./priceCard3.png"}
            text="Commercial Cleaning"
            alert={activeItem === 2}
            active={activeItem === 2}
            onClick={() => handleItemClick(2)}
          />
          <SidebarItem
            icon={"./payment.png"}
            text="Payments"
            alert={activeItem === 3}
            active={activeItem === 3}
            onClick={() => handleItemClick(3)}
          />
        </Sidebar>
      </div>

      {activeItem == 0 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          <p className="text-center text-[40px] mt-10">Bin Clean</p>
          <div className="flex justify-between flex-wrap mt-[30px]">
            {/* <CleaningCard
              item={{ ...previousCleaningState, title: "Previous Cleaning" }}
              w={"50%"}
            /> */}
            {/* <CleaningCard
              title={"Next Cleaning"}
              item={tomorrowCleaningState}
              w={"50%"}
            /> */}
            <CleaningList cleanings={tomorrowCleaningState}  serviceType="Bin Clean" cleaningTitle="Previous Cleaning" />
            <CleaningList cleanings={tomorrowCleaningState} serviceType="Bin Clean"  cleaningTitle="Next Cleaning"/>

          </div>
          <div className="my-5 flex w-full justify-end">
            <button
              disabled={skip ? true : false}
              onClick={() => {
                skipThisWeekFun();
              }}
              className="bg-blue-500 rounded-2xl px-[25px] text-white py-[10px]"
            >
              Skip this week
            </button>
          </div>
        </div>
      )}
      {/* <div className="w-full justify-center   items-center mt-10 ">
            {loading ? (
              <div className="w-full justify-start ml-[45%] items-center h-full">
                <Oval
                  visible={true}
                  height="80"
                  width="80"
                  color="lightblue"
                  ariaLabel="oval-loading"
                  wrapperStyle={{ color: "red" }}
                  secondaryColor="blue"
                  wrapperClass=""
                />
              </div>
            ) : (
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={dates.map((date, index) => ({
                  title: date.skip
                    ? " This Week was Skipped"
                    : "Weekly Cleanings",
                  start: date.date,
                  end: index < dates.length - 1 ? dates[index + 1].date : null,
                  backgroundColor: date.skip ? "red" : "green",
                }))}
              />
            )}
          </div> */}

      {activeItem == 1 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          <p className="text-center text-[40px] mt-10">Car Wash</p>
          <div className="flex justify-between flex-wrap mt-[30px]">
            {/* <CleaningCard
              item={{ ...previousCleaningState, title: "Previous Cleaning" }}
              w={"50%"}
            />
            <CleaningCard
              item={{ ...tomorrowCleaningState, title: "Next Cleaning" }}
              w={"50%"}
            /> */}
             <CleaningList cleanings={tomorrowCleaningState}  serviceType="Car Wash" cleaningTitle="Previous Cleaning" />
            <CleaningList cleanings={tomorrowCleaningState} serviceType="Car Wash"  cleaningTitle="Next Cleaning"/>
          </div>
          <div className="my-5 flex w-full justify-end">
            <button
              disabled={skip ? true : false}
              onClick={() => {
                skipThisWeekFun();
              }}
              className="bg-blue-500 rounded-2xl px-[25px] text-white py-[10px]"
            >
              Skip this week
            </button>
          </div>
        </div>
      )}
      {activeItem == 2 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          <p className="text-center text-[40px] mt-10">Commercial Cleaning</p>
          <div className="flex justify-between flex-wrap mt-[30px]">
            {/* <CleaningCard
              item={{ ...previousCleaningState, title: "Previous Cleaning" }}
              w={"50%"}
            />
            <CleaningCard
              item={{ ...tomorrowCleaningState, title: "Next Cleaning" }}
              w={"50%"}
            /> */}
            <CleaningList cleanings={tomorrowCleaningState}  serviceType="Commercial Cleaning" cleaningTitle="Previous Cleaning" />
            <CleaningList cleanings={tomorrowCleaningState} serviceType="Commercial Cleaning"  cleaningTitle="Next Cleaning"/>
          </div>
          <div className="my-5 flex w-full justify-end">
            <button
              disabled={skip ? true : false}
              onClick={() => {
                skipThisWeekFun();
              }}
              className="bg-blue-500 rounded-2xl px-[25px] text-white py-[10px]"
            >
              Skip this week
            </button>
          </div>
        </div>
      )}

      {/* {activeItem == 1 && (
        <div className='w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll'>
          <p className='text-center text-[40px] mt-10'>Cleaning History</p>
          <div className='flex flex-col gap-5 mt-[30px] '>
            {cleaningHistoryState.map((item, i) => {
              return (
                <HistoryCard
                  title='Next Cleaning'
                  time={item.time}
                  date={item.date}
                  note={item.note}
                  address={item.address}
                  status={item.status}
                  index={1}
                />
              )
            })}
          </div>
        </div>
      )} */}

      {activeItem == 3 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          {/* <p className="text-center text-[40px] mt-10">Payments</p> */}
          {/* <div className="flex flex-col gap-5 mt-[30px]">
            <PaymentCard
              title="Next Cleaning"
              date="10/10/2024"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div> */}
          <p className="text-center text-[40px] mt-10">Payments History</p>
          <div className="  overflow-hidden border-b-2 border-gray-800 w-full mt-[20px]">
            <div className="px-6 py-4 flex justify-between gap-3">
              <div className="flex font-bold w-[5%]">
                {" "}
                <p>To</p>
              </div>
              <div className="flex font-bold w-[10%]">
                <p>Email:</p>
              </div>
              <div className="flex font-bold w-[10%]">
                <p>Date:</p>
              </div>
              <div className="flex font-bold w-[15%] whitespace-nowrap">
                <p>Recipient No</p>
              </div>
              <div className="flex font-bold w-[10%]">
                <p>Amount</p>
              </div>
              <div className=" font-bold w-[10%]">Print</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-[30px]">
            {paymentHistory.length > 0 ? (
              paymentHistory.map((item, i) => (
                <PaymentHistory key={i} item={item} />
              ))
            ) : (
              <div className=" flex justify-center">
                <Oval
                  visible={true}
                  height="80"
                  width="80"
                  color="lightblue"
                  ariaLabel="oval-loading"
                  wrapperStyle={{ color: "red" }}
                  secondaryColor="blue"
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mr-[30px] flex flex-col justify-end items-end">
        <UserCircleIcon
          className="rounded-full h-16 w-16 max-sm:w-[40px] max-sm:h-[40px] mt-4 cursor-pointer"
          onClick={toggleMenu}
          //   onMouseLeave={toggleMenu}
        />
        {showMenu && (
          <div className="flex flex-col  mt-4 bg-slate-100">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 whitespace-nowrap">
              <UserCircleIcon className="h-5 w-5 " />
              Sign Out
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200">
              <QuestionMarkCircleIcon className="h-5 w-5" />
              Help
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200">
              <Cog8ToothIcon className="h-5 w-5" />
              Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

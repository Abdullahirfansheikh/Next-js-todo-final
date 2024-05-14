// import React from "react";

// // @ts-ignore
// const CleaningCard = ({ item ,w,title}) => {
//   console.log("🚀 ~ CleaningCard ~ item:", item)
//   return (
//     <div className={` rounded overflow-hidden shadow-lg w-[${w}] max-lg:w-[100%] `}>
//       <div className="px-6 py-4 flex flex-col gap-3">
//         {title && (
//           <p className="text-center font-semibold text-[22px]">{title}</p>
//         )}
        
//         {item.name && (
//           <div className="flex justify-between">
//             <p>Name:</p> <p>{item.name || "--"}</p>
//           </div>
//         )}
//         {item.email && (
//           <div className="flex justify-between">
//             <p>Email:</p> <p>{item.email}</p>
//           </div>
//         )}
//         {/* <div className="flex justify-between">
//           <p>Pick Up:</p> <p>{item.date || "--"}</p>
//         </div> */}
//         <div className="flex justify-between">
//           <p>Time:</p> <p>{item.time || "--"}</p>
//         </div>
//         <div className="flex justify-between">
//           <p>Address:</p> <p>{item.address || "--"}</p>
//         </div>
//         {/* {item.status && ( */}
//           <div className="flex justify-between">
//             <p>Status:</p> <p>{item.status }</p>
//           </div>
//         {/* )} */}
//         {/* <div className="flex justify-between text-base">
//           <p>Note:</p> <p>{item.note || "--"}</p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default CleaningCard;
import React from 'react';

// @ts-ignore
const CleaningCard = ({ cleaning }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg max-w-lg ">
      <div className="px-6 py-4">
        {/* <div className="font-bold text-xl mb-2">{cleaning.service}</div> */}
        <p><span className="font-semibold">Time:</span> {cleaning?.time}</p>
        <p><span className="font-semibold">Day:</span> {cleaning?.day}</p>
        <p><span className="font-semibold">Address:</span> {cleaning?.address}</p>
        <p><span className="font-semibold">Status:</span> {cleaning?.status}</p>
        {/* <p><span className="font-semibold">Plan:</span> {cleaning.plan}</p> */}
      </div>
    </div>
  );
};

// @ts-ignore
function CleaningList({ cleanings, serviceType, cleaningTitle }) {
  // Get the current day
  const currentDay = new Date().getDay(); // Sunday is 0, Saturday is 6

  // Determine if it's a Sunday or Saturday
  const isSunday = currentDay === 0;
  const isSaturday = currentDay === 6;

  // Determine previous or next cleaning based on the current day
  const previousCleaning = isSunday ? 'Saturday' : 'Sunday';
  const nextCleaning = isSunday ? 'Sunday' : 'Saturday';

  // Filter out the cleanings based on the service type and cleaning title
  // @ts-ignore
  const previousCleanings = cleanings?.filter(cleaning => 
    cleaning?.service === serviceType && cleaning?.day === previousCleaning
  );

  // @ts-ignore
  const nextCleanings = cleanings?.filter(cleaning => 
    cleaning?.service === serviceType && cleaning?.day === nextCleaning
  );

  return (
    <div className='w-[50%]'>
      <h2 className="text-2xl font-bold mb-4">{cleaningTitle}</h2>
      {cleaningTitle === "Previous Cleaning" ? (
        <div className="">
          {previousCleanings && previousCleanings.length > 0 ? (
            // @ts-ignore
            previousCleanings.map((cleaning, index) => (
              <CleaningCard key={index} cleaning={cleaning} />
            ))
          ) : (
            // @ts-ignore
            <CleaningCard />
            // <p>No {serviceType} cleanings found for {previousCleaning}.</p>
          )}
        </div>
      ) : (
        <div className="">
          {nextCleanings && nextCleanings.length > 0 ? (
            // @ts-ignore
            nextCleanings.map((cleaning, index) => (
              <CleaningCard key={index} cleaning={cleaning} />
            ))
          ) : (
            // @ts-ignore
            <CleaningCard />

            // <p>No {serviceType} cleanings found for {nextCleaning}.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CleaningList;

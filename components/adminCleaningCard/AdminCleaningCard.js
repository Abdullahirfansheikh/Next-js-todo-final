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
function AdminCleaningCard({ cleanings, serviceType, cleaningTitle }) {
  // Get the current day
  const currentDay = new Date().getDay(); // Sunday is 0, Saturday is 6

  // @ts-ignore
  const CleaningDetail = cleanings.filter(cleaning => cleaning.service === serviceType);
  console.log("🚀 ~ AdminCleaningCard ~ CleaningDetail:", CleaningDetail)

  // Determine if it's a Sunday or Saturday
  const isSunday = currentDay === 0;
  const isSaturday = currentDay === 6;

  // Determine previous or next cleaning based on the current day
  const previousCleaning = isSunday ? 'Sunday' : 'Saturday';
  const nextCleaning = isSunday ? 'Saturday' : 'Sunday';

  // Filter out the cleanings based on the service type and cleaning title
  // @ts-ignore
  const previousCleanings = CleaningDetail?.filter(cleaning => 
    cleaning?.service === serviceType && cleaning?.day === previousCleaning
    );
    console.log("🚀 ~ AdminCleaningCard ~ previousCleanings:", previousCleanings)

  // @ts-ignore
  const nextCleanings = CleaningDetail?.filter(cleaning => 
    cleaning?.service === serviceType && cleaning?.day === nextCleaning
    );
    console.log("🚀 ~ AdminCleaningCard ~ nextCleanings:", nextCleanings)

  return (
    <div className='w-[50%]'>
      <h2 className="text-2xl font-bold mb-4">{cleaningTitle}</h2>
      {cleaningTitle === "Saturday Cleaning" ? (
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

export default AdminCleaningCard;

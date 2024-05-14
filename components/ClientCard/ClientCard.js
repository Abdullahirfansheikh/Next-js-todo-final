import React from "react";
import { deleteUser } from "@/store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
const ClientCard = ({ client ,deleteUserFun,blockUnBlockUserFun}) => {
  const dispatch = useDispatch();

  return (
    <div className=" rounded-lg overflow-hidden shadow-lg w-full h-auto border-[1px] border-gray-300">
      <div className="px-6 py-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="font-semibold">Name:</p> <p>{client.username}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Email:</p> <p>{client.email}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Phone:</p> <p>{client.phone}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Address:</p> <p>{client.address}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Plan:</p> <p>{client?.plan[0]?.plan}</p>
        </div>
        <div className="flex gap-3">
          {" "}
          <button onClick={()=>{deleteUserFun(client._id)}} className="bg-red-500 px-5 py-2 rounded-md text-white">
            Delete
          </button>{" "}
          {client.isBlock ? (
            <button onClick={()=>{blockUnBlockUserFun(client._id)}} className="bg-green-500 px-5 py-2 rounded-md text-white">
              UnBlock
            </button>
          ) : (
            <button onClick={()=>{blockUnBlockUserFun(client._id)}} className="bg-red-500 px-5 py-2 rounded-md text-white">
              Block
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientCard;

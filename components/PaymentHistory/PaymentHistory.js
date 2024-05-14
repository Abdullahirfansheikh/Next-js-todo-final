import { PrinterIcon } from '@heroicons/react/24/solid';
import React from 'react'
import moment from 'moment';
// @ts-ignore
const PaymentHistory = ({item}) => {
    return (
        <div className=" rounded overflow-hidden shadow-lg w-full ">
         
          <div className="px-6 py-4 flex justify-between gap-3">
            {/* <div className='flex w-[10%]'> <p>{item.from || item.to}</p></div> */}

            <div className='flex w-[5%]'> <p>{item.name}</p></div>
            <div className='flex w-[10%]'> <p>{item.email}</p></div>
            <div className='flex w-[10%]'> <p>{moment(item.createdAt).format('DD/MM/YYYY')}</p></div>
            <div className='flex w-[15%]'> <p>{item.customer}</p></div>
            <div className='flex w-[10%]'> <p>{item.amount}</p></div>
           {/* {item.status && <div className='flex w-[10%]'> <p>{item.status}</p></div>} */}
            <div className=' w-[10%]'><PrinterIcon className='w-[20px] h-[20px]'/></div>
            {/* <div className=' w-[10%]'><button className="bg-blue-500 px-8 py-2 rounded-md text-white ">Print</button></div> */}

          </div>
        </div>
      );
}

export default PaymentHistory
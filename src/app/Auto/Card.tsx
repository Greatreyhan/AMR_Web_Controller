import React from 'react'
import { HiArrowUpOnSquareStack } from "react-icons/hi2";

interface Actuator {
    listActuator: any;
    setListActuator: any;
    setShowCard: any;
  }

const Card: React.FC<Actuator> = ({listActuator, setListActuator,setShowCard}) => {
  return (
        <div className="w-64 p-4 m-auto bg-white shadow-lg rounded-2xl fixed z-50">
            <div className="w-full h-full text-center">
                <div className="flex flex-col justify-between h-full">
                    <HiArrowUpOnSquareStack width="40" height="40" className="w-12 h-12 m-auto mt-4 text-amber-500" />
                    <p className="mt-4 text-xl font-bold text-gray-800 ">
                        Kondisi Rak
                    </p>
                    <p className="px-6 py-2 text-xs text-gray-600 ">
                        Apakah anda ingin mengangkat barang?
                    </p>
                    <div className="flex items-center justify-between w-full gap-4 mt-8">
                        <button onClick={()=>{
                            setListActuator([...listActuator, 1]);
                            setShowCard(false);
                        }} type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Angkat
                        </button>
                        <button onClick={()=>{
                            setListActuator([...listActuator, 0]);
                            setShowCard(false);
                        }} type="button" className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-amber-500 focus:ring-offset-amber-200 text-amber-500 text-amber-500w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Turunkan
                        </button>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default Card
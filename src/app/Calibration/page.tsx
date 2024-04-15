'use client'
import React,{useState, useEffect} from 'react'
import Grid from './Grid'

const Calibration = () => {
  const [currentPosition, setCurrentPosition] = useState([10,25])
  const [hoverData, setHoverData] = useState([0,0])
  const [reqPosition, setReqPosition] = useState([0,0])

  useEffect(()=>{
    console.log(reqPosition)
  },[currentPosition,hoverData,reqPosition])
  return (
    <div className='w-full'>
      <h2 className='pt-24 text-center text-2xl uppercase font-semibold text-slate-200'>AMR Positioning</h2>
      <div className='w-full flex justify-center py-4'>
          <Grid rows={20} cols={50} currentPosition={currentPosition} />
      </div>
      
    </div>
  )
}

export default Calibration
import React from 'react'
import WeatherFinder from './WeatherFinder'


function TopHeader() {
  return (
    <div className="flex flex-row items-center justify-between p-2 bg-white shadow-md rounded-lg">
      <WeatherFinder />
      <a href="/login" className="">
          SIGN IN
      </a>
  </div>



  )
}

export default TopHeader
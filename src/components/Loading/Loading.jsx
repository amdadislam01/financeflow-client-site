import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0F172A] text-white z-50">
      {/* Spinning Border Circle */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#6D28D9] border-b-[#6D28D9] border-l-transparent border-r-transparent animate-spin-slow"></div>
      </div>

      {/* Logo Text */}
      <h1 className="mt-6 text-3xl font-bold tracking-wide animate-pulse">
        Smart<span className="text-[#6D28D9]">Deals</span>
      </h1>

      {/* Loading Dots */}
      <div className="flex mt-3 gap-1">
        <span className="dot bg-[#6D28D9]"></span>
        <span className="dot bg-[#6D28D9]"></span>
        <span className="dot bg-[#6D28D9]"></span>
      </div>
    </div>
  )
}

export default Loading

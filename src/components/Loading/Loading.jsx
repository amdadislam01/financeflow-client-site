import React from 'react'
import { MdAccountBalanceWallet } from 'react-icons/md'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0F172A] text-white z-50">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#10B981] border-b-[#14B8A6] border-l-transparent border-r-transparent animate-spin-slow"></div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <MdAccountBalanceWallet className="text-[#10B981] w-7 h-7 animate-bounce" />
        <h1 className="text-3xl font-bold tracking-wide animate-pulse">
          Finance<span className="text-[#14B8A6]">Flow</span>
        </h1>
      </div>

      <div className="flex mt-3 gap-1">
        <span className="dot bg-[#14B8A6] w-2.5 h-2.5 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
        <span className="dot bg-[#10B981] w-2.5 h-2.5 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
        <span className="dot bg-[#14B8A6] w-2.5 h-2.5 rounded-full animate-bounce"></span>
      </div>
    </div>
  )
}

export default Loading

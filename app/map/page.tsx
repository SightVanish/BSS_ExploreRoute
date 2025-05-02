'use client'
import { useState } from 'react'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'

export default function MapPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen relative">
      {/* Sidebar button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`
          lg:hidden fixed 
          top-4 
          z-50 
          p-2 
          bg-white 
          rounded-md 
          shadow-lg
          transition-all
          duration-300
          ${isSidebarOpen ? 'left-[calc(100%-3rem)] sm:left-[calc(24rem+16px)]' : 'left-4'}
          sm:${isSidebarOpen ? 'left-[calc(24rem+16px)]' : 'left-4'}
        `}
      >
        {isSidebarOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static
        h-screen
        w-full sm:w-sm 
        bg-white 
        border-r 
        border-gray-200
        shadow-lg 
        p-4
        transition-transform 
        duration-300 
        ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-40
      `}>
        <h2 className="text-xl font-semibold mb-4 mt-4">Recommendations</h2>
        <nav>
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">
              选项 1
            </li>
            <li className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">
              选项 2
            </li>
            <li className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">
              选项 3
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Map */}
      <div className="flex-1">
        <div className="p-4 mt-12 lg:mt-0">
          <h1 className="text-2xl font-bold">地图</h1>
          <div className="mt-4">
            这是地图页面的内容
          </div>
        </div>
      </div>

      {/* Mask */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
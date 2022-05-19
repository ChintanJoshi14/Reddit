import Image from 'next/image'
import React from 'react'
import { ChevronDownIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  MenuIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'

function Header() {
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          objectFit="contain"
          src="https://links.papareact.com/fqy"
          layout="fill"
        />
      </div>

      <div className="xl: mx-7 flex min-w-[300px] items-center">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* SearchBox */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className=' text-gray-500 space-x-2 mx-5 hidden lg:inline-flex'>
          <SparklesIcon className='icon'/>
          <GlobeIcon className='icon'/>
          <VideoCameraIcon className='icon'/>
          <hr className='h-10 border border-gray-100'/>
          <ChatIcon className='icon'/>
          <BellIcon className='icon'/>
          <PlusIcon className='icon'/>
          <SpeakerphoneIcon className='icon'/>
      </div> 

      <div className='ml-5 flex items-center lg:hidden'>
          <MenuIcon className='icon'/>
      </div>

      <div>
          <img src='https://links.papareact.com/23l' alt='this is image' />
      </div>
    </div>
  )
}

export default Header

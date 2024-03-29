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
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function Header() {
  const { data: session } = useSession() // when we login we get a session cookie which proves who we are and we need to use useSession hook to access session property. useSession returns "data" ans we are renaming it to "session"

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
        <Image
          objectFit="contain"
          src="https://links.papareact.com/fqy"
          layout="fill"
        />
        </Link>
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* SearchBox */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className=" mx-5 hidden space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* Sign in Sign out button */}
      {session ? (
        <div
          onClick={() => {
            <Link href="/"></Link>
            signOut()
          }}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            {/* sm:flex flex-shrink-0 */}
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
            />
          </div>
          <div className="flex-1 text-xs">
            {/* if we have session tha we will display the user's name: and also we have applied css class truncate which will truncate the name if it does not fit.*/}
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400 ">Sign Out</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            {/* sm:flex flex-shrink-0 */}
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
            />
          </div>

          <p className="text-gray-400 ">Sign In</p>
        </div>
      )}
    </div>
  )
}

export default Header

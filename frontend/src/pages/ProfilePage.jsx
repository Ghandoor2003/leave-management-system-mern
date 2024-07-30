import React from 'react';
import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';


const ProfilePage = () => {
  return (
    <>
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
        <Sidebar active={'profile'}/>
        <div className="flex-1 flex flex-col">
        <header
            aria-label="page caption"
            className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center shadow-sm"
        >
            <h1 id="page-caption" className="font-semibold text-lg">
            Profile information
            </h1>
        </header>
        <main className="flex-grow flex min-h-0 border-t bg-gray-50">
            <div className="p-4 w-full">
                <Profile />
            </div>
        </main>
        </div>
    </div>
    </>
  )
}

export default ProfilePage
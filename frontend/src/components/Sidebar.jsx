import React, { useState } from 'react'

const Sidebar = ({active}) => {
  const [activePage, setActivePage] = useState(active);

  return (
    <nav
      aria-label="side bar"
      aria-orientation="vertical"
      className="flex-none flex flex-col items-center text-center bg-light-blue-900 text-gray-400 border-r min-h-screen"
    >
      <div className="h-16 flex items-center w-full">
        <img
          className="h-6 w-6 mx-auto"
          src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/leaves.png"
          alt="Logo"
        />
      </div>
      <ul>
        <li>
          <a
            title="Main Page"
            href="/dashboard"
            className={`h-16 px-6 flex items-center w-full ${activePage === 'dashboard' ? 'text-gray-800 bg-green-700' : 'hover:text-black'}`}
            onClick={() => setActivePage('dashboard')}
          >
            <i className="mx-auto">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
              </svg>
            </i>
          </a>
        </li>
        <li>
          <a
            title="New Leave"
            href="/leave"
            className={`h-16 px-6 flex items-center w-full ${activePage === 'leave' ? 'text-gray-800 bg-green-700' : 'hover:text-black'}`}
            onClick={() => setActivePage('leave')}
          >
            <i className="mx-auto">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 24 24"
              >
                <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7l-5-5zM8 20V4h10v5h5v11H8zm2-9h6v2h-6v-2zm0 4h8v2h-8v-2zm0-8h4v2h-4V7z" />
              </svg>
            </i>
          </a>
        </li>
        <li>
          <a
            title="Profile"
            href="/profile"
            className={`h-16 px-6 flex items-center w-full ${activePage === 'profile' ? 'text-gray-800 bg-green-700' : 'hover:text-black'}`}
            onClick={() => setActivePage('profile')}
          >
            <i className="mx-auto">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
              </svg>
            </i>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar

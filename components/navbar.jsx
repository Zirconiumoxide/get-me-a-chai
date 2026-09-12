"use client";
import React, {useState, useRef, useEffect} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const navigate = useRouter();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="logo font-bold text-lg flex justify-center items-center">
        <img src="/tea.gif" width={44} alt="" />
        <span className="ml-2">Get me a Chai</span>
      </Link>
      <div ref={dropdownRef} className="relative">
        {session && (
          <>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex mx-4 items-center justify-center text-white bg-blue-500 box-border border border-transparent hover:bg-blue-600 hover:ring-4 hover:ring-blue-300 shadow-xs font-medium leading-5 text-sm px-4 py-2.5 hover:outline-none rounded-2xl cursor-pointer"
              type="button"
            >
              Welcome, {session.user.email}
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${showDropdown ? '' : 'hidden'} border border-default-medium rounded-lg shadow-lg w-44 absolute right-0 mt-2 bg-[oklch(0.28_0.03_257.69)]`}
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center w-full p-2 hover:bg-gray-700 hover:text-white rounded cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-gray-700 hover:text-white rounded cursor-pointer"
                  >
                    Your Page
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="inline-flex items-center w-full p-2 hover:bg-gray-700 hover:text-white rounded cursor-pointer"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
        {!session && (
          <Link href="/login">
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

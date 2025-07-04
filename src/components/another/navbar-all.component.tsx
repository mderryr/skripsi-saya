"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/app/favicon.ico";

export default function page() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="bg-white z-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between z-10">
          <div className="absolute inset-y-0 left-0 z-20 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start z-10">
            <div className="flex flex-shrink-0 items-center">
              <Image className="h-8 w-auto" src={Icon} alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link
                  href={"/"}
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                >
                  Beranda
                </Link>
                <Link
                  href={"/pendataan"}
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                >
                  Pendataan
                </Link>
                <Link
                  href={"/tentang-kami"}
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
                >
                  Tentang Kami
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <!-- Profile dropdown --> */}
            <Link href="/login">
              <div className="relative ml-3">
                <div>
                  <Button className="text-white  font-bold text-lg hover:bg-gray-800 hover:text-gray-400">
                    Masuk
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {open && (
            <div
        className={`sm:hidden z-20 absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-500 ease-in-out ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        id="mobile-menu"
      >
        <div className="flex flex-col space-y-1 px-4 pb-4 pt-2">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100"
          >
            Beranda
          </Link>
          <Link
            href="/pendataan"
            className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100"
          >
            Pendataan
          </Link>
          <Link
            href="/tentang-kami"
            className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100"
          >
            Tentang Kami
          </Link>
        </div>
      </div>
      )}
    </nav>
  );
}

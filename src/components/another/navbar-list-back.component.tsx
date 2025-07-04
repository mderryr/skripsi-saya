"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarPageProps {
  Massage?: string;
}

const NavbarPage = ({ Massage }: NavbarPageProps) => {
  const router = useRouter();
  return (
    <>
      <nav className="bg-white dark:bg-cyan-950 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="h-16 flex items-center px-4">
          <div className="flex-1 flex items-center">
            <Link
              className="flex items-center outline-none"
              href=""
              onClick={() => router.back()}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
              </svg>
            </Link>
            <h6 className="text-xl font-medium ml-4 flex-1 text-center">
              {Massage ? Massage : "Kembali"}
            </h6>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding under navbar */}
      <div className="h-16" />
    </>
  );
};

export default NavbarPage;
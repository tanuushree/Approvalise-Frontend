"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import { Disclosure } from "@headlessui/react";

export const Navbar = () => {
  const navigation = [
   
  ];
  return (
    <div className="w-full relative ">
      <nav className="container bg-indigo-600 flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="ml-18 mr-3 space-x-4 lg:flex nav__item">
          <Link href="/" className="px-6 flex py-2 aling-middle font-bold text-indigo-600 bg-white rounded-md md:ml-5">
              <BookOpenIcon className="w-5 h-7 mr-2" />
               approvalize
          </Link>
          
        </div>
        <div className="ml-18 mr-3 space-x-4 lg:flex nav__item">
          <Link href="/admin_auth" className="px-6 flex py-2 aling-middle font-bold text-white">
                Admin
          </Link>
          <Link href="/" className="px-6 flex py-2 aling-middle font-bold text-white">
               Home
          </Link>
        </div>
      </nav>
    </div>
  );
}
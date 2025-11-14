"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      {/* MOBILE */}
      <div className="block md:hidden">
        <div className="bg-white px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="logo">
              <Image
                src="/logo.svg"
                alt="Platinum Window Expert"
                width={120}
                height={30}
                className="h-10 w-auto"
              />
            </Link>
            <div className="nav-group flex flex-col justify-start items-start gap-0.5">
              <p className="text-[0.79rem] font-inter font-bold text-center mb-0 text-dark">
                Call Us Today
              </p>
              <div className="phone-grp flex flex-row items-center gap-1.5">
                <Image
                  src="/call.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="h-4 w-auto"
                />
                <a
                  href="tel:+18664951543"
                  className="font-bold text-[0.82rem] font-inter text-red"
                >
                  1-(866)-495-1543
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block">
        <div className="bg-white px-10 xl:py-7 py-6 xl:px-32">

          <div className="mx-auto flex justify-between items-center">
            <Link href="/">
            <Image
              src="/logo.svg"
              alt="Platinum Window Expert"
                width={120}
                height={30}
                className="h-12 lg:h-14 xl:h-16 w-auto"
              />
            </Link>

            <button className="flex flex-row items-center gap-2 rounded-sm text-sm lg:text-base xl:text-lg px-4 lg:px-5 py-3 font-bold font-inter cursor-pointer bg-red  text-white transition-all duration-300 hover:bg-blue">
              <Image
                src="/desktop.svg"
                alt="Phone"
                width={16}
                height={16}
                className="h-4 lg:h-4.5 xl:h-5.5 w-auto"
              />
              <a href="tel:+18664951543" className="text-sm lg:text-base xl:text-[1.3rem] font-inter text-white">
              <span className="text-sm lg:text-base xl:text-[1.3rem] font-inter text-white">
                1-(866)-495-1543
              </span>
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

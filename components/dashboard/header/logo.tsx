import { brand } from "@/lib/constants/brand";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-x-2">
      <svg
        width="44"
        height="44"
        className="size-9"
        aria-hidden
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.8393 32.8384C25.4194 40.2584 13.3892 40.2584 5.96927 32.8384"
          stroke="#3B82F6"
          strokeWidth="6"
        />
        <path
          opacity="0.5"
          d="M26.1218 26.1214C22.4118 29.8313 16.3968 29.8313 12.6868 26.1214"
          stroke="#3B82F6"
          strokeWidth="6"
        />
        <path
          opacity="0.5"
          d="M15.1607 15.1616C22.5806 7.74163 34.6108 7.74163 42.0307 15.1616"
          stroke="#3B82F6"
          strokeWidth="6"
        />
        <path
          d="M21.8782 21.8786C25.5882 18.1687 31.6032 18.1687 35.3132 21.8786"
          stroke="#3B82F6"
          strokeWidth="6"
        />
      </svg>
    </Link>
  );
}

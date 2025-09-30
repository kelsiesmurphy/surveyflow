import React from "react";

import { ImageResponse } from "next/og";

export const size = {
  width: 44,
  height: 44,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        className="size-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_iii_2039_2834)">
          <g clip-path="url(#clip0_2039_2834)">
            <rect width="48" height="48" rx="12" fill="#3B82F6" />
            <g filter="url(#filter1_d_2039_2834)">
              <path
                d="M30.9974 30.9967C25.1233 36.8709 15.5994 36.8709 9.72526 30.9967"
                stroke="url(#paint0_linear_2039_2834)"
                strokeWidth="4.75"
              />
              <path
                opacity="0.5"
                d="M25.6794 25.68C22.7423 28.6171 17.9804 28.6171 15.0433 25.68"
                stroke="url(#paint1_linear_2039_2834)"
                strokeWidth="4.75"
              />
              <path
                opacity="0.5"
                d="M17.0026 17.0033C22.8767 11.1291 32.4006 11.1291 38.2747 17.0033"
                stroke="url(#paint2_linear_2039_2834)"
                strokeWidth="4.75"
              />
              <path
                d="M22.3206 22.32C25.2577 19.3829 30.0196 19.3829 32.9567 22.32"
                stroke="url(#paint3_linear_2039_2834)"
                strokeWidth="4.75"
              />
            </g>
          </g>
          <rect
            x="1"
            y="1"
            width="46"
            height="46"
            rx="11"
            stroke="url(#paint4_linear_2039_2834)"
            strokeWidth="2"
          />
        </g>
        <defs>
          <filter
            id="filter0_iii_2039_2834"
            x="0"
            y="-3"
            width="48"
            height="54"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-3" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_2039_2834"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_innerShadow_2039_2834"
              result="effect2_innerShadow_2039_2834"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="erode"
              in="SourceAlpha"
              result="effect3_innerShadow_2039_2834"
            />
            <feOffset />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_2039_2834"
              result="effect3_innerShadow_2039_2834"
            />
          </filter>
          <filter
            id="filter1_d_2039_2834"
            x="4.20833"
            y="4.20833"
            width="39.5833"
            height="44.3333"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1.58333"
              operator="erode"
              in="SourceAlpha"
              result="effect1_dropShadow_2039_2834"
            />
            <feOffset dy="2.375" />
            <feGaussianBlur stdDeviation="2.375" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2039_2834"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2039_2834"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_2039_2834"
            x1="15.0433"
            y1="36.3148"
            x2="25.6794"
            y2="25.6787"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0.8" />
            <stop offset="1" stop-color="white" stop-opacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2039_2834"
            x1="17.7023"
            y1="28.339"
            x2="23.0203"
            y2="23.021"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0.8" />
            <stop offset="1" stop-color="white" stop-opacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2039_2834"
            x1="32.9567"
            y1="11.6852"
            x2="22.3206"
            y2="22.3213"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0.8" />
            <stop offset="1" stop-color="white" stop-opacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2039_2834"
            x1="30.2977"
            y1="19.661"
            x2="24.9797"
            y2="24.979"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0.8" />
            <stop offset="1" stop-color="white" stop-opacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_2039_2834"
            x1="24"
            y1="0"
            x2="24"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0.12" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0_2039_2834">
            <rect width="48" height="48" rx="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}

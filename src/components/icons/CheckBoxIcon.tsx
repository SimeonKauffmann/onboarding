import React from "react"
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon"

const CheckBoxIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 37.5 37.499999"
      width="37.5"
      height="37.499999"
      {...props}
    >
      <defs>
        <clipPath id="clip-check">
          <path
            d="M 0 0 L 37.007812 0 L 37.007812 37.007812 L 0 37.007812 Z M 0 0 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-check)">
        <path
          fill="rgb(59.999084%, 72.158813%, 23.529053%)"
          d="M 37.5 18.75 C 37.5 19.363281 37.46875 19.976562 37.410156 20.585938 C 37.347656 21.199219 37.257812 21.804688 37.140625 22.40625 C 37.019531 23.011719 36.871094 23.605469 36.691406 24.191406 C 36.515625 24.78125 36.308594 25.359375 36.074219 25.925781 C 35.835938 26.492188 35.574219 27.046875 35.285156 27.589844 C 34.996094 28.128906 34.679688 28.65625 34.339844 29.167969 C 34 29.675781 33.632812 30.171875 33.242188 30.644531 C 32.855469 31.121094 32.441406 31.574219 32.007812 32.007812 C 31.574219 32.441406 31.121094 32.855469 30.644531 33.242188 C 30.171875 33.632812 29.675781 34 29.167969 34.339844 C 28.65625 34.679688 28.128906 34.996094 27.589844 35.285156 C 27.046875 35.574219 26.492188 35.835938 25.925781 36.074219 C 25.359375 36.308594 24.78125 36.515625 24.191406 36.691406 C 23.605469 36.871094 23.011719 37.019531 22.40625 37.140625 C 21.804688 37.257812 21.199219 37.347656 20.585938 37.410156 C 19.976562 37.46875 19.363281 37.5 18.75 37.5 C 18.136719 37.5 17.523438 37.46875 16.914062 37.410156 C 16.300781 37.347656 15.695312 37.257812 15.09375 37.140625 C 14.488281 37.019531 13.894531 36.871094 13.308594 36.691406 C 12.71875 36.515625 12.140625 36.308594 11.574219 36.074219 C 11.007812 35.835938 10.453125 35.574219 9.910156 35.285156 C 9.371094 34.996094 8.84375 34.679688 8.332031 34.339844 C 7.824219 34 7.328125 33.632812 6.855469 33.242188 C 6.378906 32.855469 5.925781 32.441406 5.492188 32.007812 C 5.058594 31.574219 4.644531 31.121094 4.257812 30.644531 C 3.867188 30.171875 3.5 29.675781 3.160156 29.167969 C 2.820312 28.65625 2.503906 28.128906 2.214844 27.589844 C 1.925781 27.046875 1.664062 26.492188 1.425781 25.925781 C 1.191406 25.359375 0.984375 24.78125 0.808594 24.191406 C 0.628906 23.605469 0.480469 23.011719 0.359375 22.40625 C 0.242188 21.804688 0.152344 21.199219 0.0898438 20.585938 C 0.03125 19.976562 0 19.363281 0 18.75 C 0 18.136719 0.03125 17.523438 0.0898438 16.914062 C 0.152344 16.300781 0.242188 15.695312 0.359375 15.09375 C 0.480469 14.488281 0.628906 13.894531 0.808594 13.308594 C 0.984375 12.71875 1.191406 12.140625 1.425781 11.574219 C 1.664062 11.007812 1.925781 10.453125 2.214844 9.910156 C 2.503906 9.371094 2.820312 8.84375 3.160156 8.332031 C 3.5 7.824219 3.867188 7.328125 4.257812 6.855469 C 4.644531 6.378906 5.058594 5.925781 5.492188 5.492188 C 5.925781 5.058594 6.378906 4.644531 6.855469 4.257812 C 7.328125 3.867188 7.824219 3.5 8.332031 3.160156 C 8.84375 2.820312 9.371094 2.503906 9.910156 2.214844 C 10.453125 1.925781 11.007812 1.664062 11.574219 1.425781 C 12.140625 1.191406 12.71875 0.984375 13.308594 0.808594 C 13.894531 0.628906 14.488281 0.480469 15.09375 0.359375 C 15.695312 0.242188 16.300781 0.152344 16.914062 0.0898438 C 17.523438 0.03125 18.136719 0 18.75 0 C 19.363281 0 19.976562 0.03125 20.585938 0.0898438 C 21.199219 0.152344 21.804688 0.242188 22.40625 0.359375 C 23.011719 0.480469 23.605469 0.628906 24.191406 0.808594 C 24.78125 0.984375 25.359375 1.191406 25.925781 1.425781 C 26.492188 1.664062 27.046875 1.925781 27.589844 2.214844 C 28.128906 2.503906 28.65625 2.820312 29.167969 3.160156 C 29.675781 3.5 30.171875 3.867188 30.644531 4.257812 C 31.121094 4.644531 31.574219 5.058594 32.007812 5.492188 C 32.441406 5.925781 32.855469 6.378906 33.242188 6.855469 C 33.632812 7.328125 34 7.824219 34.339844 8.332031 C 34.679688 8.84375 34.996094 9.371094 35.285156 9.910156 C 35.574219 10.453125 35.835938 11.007812 36.074219 11.574219 C 36.308594 12.140625 36.515625 12.71875 36.691406 13.308594 C 36.871094 13.894531 37.019531 14.488281 37.140625 15.09375 C 37.257812 15.695312 37.347656 16.300781 37.410156 16.914062 C 37.46875 17.523438 37.5 18.136719 37.5 18.75 Z M 37.5 18.75 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <path
        fill="rgb(100%, 100%, 100%)"
        d="M 14.101562 31.679688 L 3.875 21.457031 L 7.949219 17.382812 L 14.101562 23.53125 L 29.546875 8.082031 L 33.625 12.15625 Z M 14.101562 31.679688 "
        fillOpacity="1"
        fillRule="nonzero"
      />
    </SvgIcon>
  )
}

export default CheckBoxIcon
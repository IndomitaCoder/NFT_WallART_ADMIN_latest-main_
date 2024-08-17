import React from "react";
// import Ripple from "react-waves-effect/lib";

const type_colors = {
  green: " text-white hover:bg-[#098256] bg-[#34c38f] ",
  red: " text-white hover:bg-[#e24646] bg-[#c46c6c] ",
  blue: ' text-white hover:bg-[#2d6abf] bg-[#4678be] '
};

const type_icons = {
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  ),
};

const type_sizes = {
  sm: ' py-1 px-3 text-sm ',
  md: " py-2 px-3 text-sm ",
  long: " py-2 px-6 text-sm ",
};

const type_rounded = {
  none: "",
  sm: " rounded ",
};

const Button = ({ onClickHandle, color, icon, size, rounded, text }) => {
  return (
    // <Ripple>
      <div
        className={`flex cursor-pointer ${type_sizes[size]} ${type_rounded[rounded]} transition-all duration-100 ${type_colors[color]} text-center items-center`}
        onClick={() => {
          onClickHandle(true);
        }}
      >
        {icon && type_icons[icon]}
        <span>{text}</span>
      </div>
    // </Ripple>
  );
};

export default Button;

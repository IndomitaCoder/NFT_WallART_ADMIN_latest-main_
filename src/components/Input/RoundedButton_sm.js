import React from "react";

const RoundedButtonSM = ({ active, text, onButtonClick, icon }) => {
  return (
    <div
      className={`hover:bg-opacity-70 transition-all cursor-pointer text-center inline-block ${
        active
          ? " border-b-[#D3B789] border-2 text-[#313949]"
          : "border-bg-white border-2 text-gray-600 "
      }  p-[4px] w-[30px] h-[30px] text-sm`}
      onClick={onButtonClick}
    >
      {text}
      {icon}
    </div>
  );
};

export default RoundedButtonSM;
 
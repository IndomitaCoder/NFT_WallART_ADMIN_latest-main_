import React, { useState } from "react";
// import Ripple from "react-waves-effect/lib";

const Header = ({ openSideBar }) => {
  const [sideBar, setsideBar] = useState(true);
  return (
    <div
      className="fixed top-0 left-0 z-50 w-full md:hidden"
      style={{
        background:
          "radial-gradient(circle, rgba(52,141,159,1) 13%, rgba(4,96,147,1) 100%)",
        backgroundRepeat: "no-repeat",
        boxShadow: "0px 2px 5px rgb(31 30 47 / 6%)",
      }}
    >
      <div className="flex justify-between items-center my-0 mx-auto h-20 p-[0 calc(20px/ 2) 0 0]">
        <div className="flex items-center">
          <div className=" h-6 px-6">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo-sm.png`}
              alt="logo"
              className="h-full"
            />
          </div>
          {/* <Ripple> */}
            <div
              className="h-16 hover:bg-[#555b6d] cursor-pointer py-2 px-3 flex items-center"
              onClick={() => {
                setsideBar(!sideBar);
                openSideBar(!sideBar);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  className=" transition-all duration-200"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    !sideBar
                      ? `M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5`
                      : `M6 18L18 6M6 6l12 12`
                  }
                />
              </svg>
            </div>
          {/* </Ripple> */}
        </div>
        <div className="flex items-center">
          <div className="h-16 hover:bg-[#555b6d] py-2 px-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
 
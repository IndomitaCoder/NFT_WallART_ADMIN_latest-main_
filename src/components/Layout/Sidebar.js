import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SimpleBarReact from "simplebar-react";
// import Ripple from "react-waves-effect/lib";

const Sidebar = ({ openSideBar }) => {
  const location = useLocation();
  const [hoveredsidebar, setHoveredsidebar] = useState(false);
  const [width, setwidth] = useState("250px");

  let style = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/left-bg.png)`,
    backgroundSize: "100% 100%",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: width,
  };
  const navigate = useNavigate();
  return (
    <div className=" relative">
      <div
        className={`flex h-full fixed top-0 bottom-0 mt-0 z-40 transition-all duration-200 overflow-y-auto`}
        style={style}
        onMouseEnter={() => (hoveredsidebar ? setwidth("250px") : null)}
        onMouseLeave={() => (hoveredsidebar ? setwidth("80px") : null)}
      >
        <div className="flex flex-col w-full">
          <div className="py-7 w-full flex justify-around items-center absolute z-50">
            <Link className=" h-10 cursor-pointer" to="/login" target='_parent'>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
                alt="logo"
                className={`${
                  hoveredsidebar && width !== "250px"
                    ? "hidden"
                    : "inline-block"
                } h-full`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
                alt="logo"
                className={`${
                  hoveredsidebar && width !== "250px"
                    ? "inline-block"
                    : "hidden"
                } h-full`}
              />
            </Link>
            {/* <Ripple> */}
              <div
                className="h-10 cursor-pointer px-3 flex items-center"
                onClick={() => {
                  setHoveredsidebar(!hoveredsidebar);
                  openSideBar(hoveredsidebar);
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
                      !hoveredsidebar
                        ? `M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5`
                        : `M6 18L18 6M6 6l12 12`
                    }
                  />
                </svg>
              </div>
            {/* </Ripple> */}
          </div>
          <SimpleBarReact>
            <div className="flex flex-col sidebar-menu-scroll overflow-x-hidden">
              <span
                className={`${
                  hoveredsidebar && width !== "250px"
                    ? " text-opacity-0"
                    : " text-opacity-100"
                } w-full py-3 px-5 text-white font-semibold text-xs opacity-60`}
              >
                MENU
              </span>
              <div className="flex flex-col w-full">
                <Link
                  to="/dashboard"
                  className={`text-white flex items-center py-3 px-4 my-1 mx-3 rounded transition-all duration-200 cursor-pointer${
                    location.pathname === "/dashboard"
                      ? " bg-opacity-30  bg-white"
                      : " hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  <span className=" inline-block w-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      hoveredsidebar && width !== "250px"
                        ? "hidden"
                        : "inline-block"
                    } font-normal text-sm transition-all duration-500`}
                  >
                    Dashboard
                  </span>
                </Link>
                <Link
                  to="/category"
                  className={`text-white flex items-center py-3 px-4 my-1 mx-3 rounded transition-all duration-200 cursor-pointer${
                    location.pathname === "/category"
                      ? " bg-opacity-30 bg-white"
                      : " hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  <span className=" inline-block w-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      hoveredsidebar && width !== "250px"
                        ? "hidden"
                        : "inline-block"
                    } font-normal text-sm transition-all duration-500`}
                  >
                    Category
                  </span>
                </Link>
                <Link
                  to="/item"
                  className={`text-white flex items-center py-3 px-4 my-1 mx-3 rounded transition-all duration-200 cursor-pointer${
                    location.pathname === "/item"
                      ? " bg-opacity-30 bg-white"
                      : " hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  <span className=" inline-block w-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      hoveredsidebar && width !== "250px"
                        ? "hidden"
                        : "inline-block"
                    } font-normal text-sm transition-all duration-500`}
                  >
                    Item
                  </span>
                </Link>
                <Link
                  to="/orders"
                  className={`text-white flex items-center py-3 px-4 my-1 mx-3 rounded transition-all duration-200 cursor-pointer${
                    location.pathname === "/orders"
                      ? " bg-opacity-30  bg-white"
                      : " hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  <span className=" inline-block w-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      hoveredsidebar && width !== "250px"
                        ? "hidden"
                        : "inline-block"
                    } font-normal text-sm transition-all duration-500`}
                  >
                    Orders
                  </span>
                </Link>
                <Link
                  to="/customers"
                  className={`text-white flex items-center py-3 px-4 my-1 mx-3 rounded transition-all duration-200 cursor-pointer${
                    location.pathname === "/customers"
                      ? " bg-opacity-30  bg-white"
                      : " hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  <span className=" inline-block w-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      hoveredsidebar && width !== "250px"
                        ? "hidden"
                        : "inline-block"
                    } font-normal text-sm transition-all duration-500`}
                  >
                    Customers
                  </span>
                </Link>
                <Link
                  to="/setting"
                  className={`text-white flex items-center py-3 px-4 my-1 mx-3 rounded transition-all duration-200 cursor-pointer${
                    location.pathname === "/setting"
                      ? " bg-opacity-30  bg-white"
                      : " hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  <span className=" inline-block w-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      hoveredsidebar && width !== "250px"
                        ? "hidden"
                        : "inline-block"
                    } font-normal text-sm transition-all duration-500`}
                  >
                    Settings
                  </span>
                </Link>
              </div>
            </div>
          </SimpleBarReact>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

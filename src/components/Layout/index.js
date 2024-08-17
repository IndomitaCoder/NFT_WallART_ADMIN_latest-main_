import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ sideBarClickHandle }) => {
  const [sideBar, setsideBar] = useState(true);
  return (
    <div className="">
      <Header
        openSideBar={(f) => {
          setsideBar(f);
          sideBarClickHandle(f);
        }}
      />
      {sideBar && (
        <Sidebar
          openSideBar={(f) => {
            sideBarClickHandle(f);
          }}
        />
      )}
    </div>
  );
};

export default Layout;

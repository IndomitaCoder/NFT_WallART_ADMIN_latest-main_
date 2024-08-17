import React from "react";

const LoadingPage = () => {
  return (
    <div className="fixed w-screen h-screen z-10 opacity-50 bg-gray-500 top-0 left-0 flex justify-center items-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPage;

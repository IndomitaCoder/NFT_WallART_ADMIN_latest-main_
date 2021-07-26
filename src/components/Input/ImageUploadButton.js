import React, { useRef } from "react";
import Button from "./Button";

const ImageUploadButton = ({ handleChange, image }) => {
  const imgButton = useRef(null);
  return (
    <>
      <input
        className=" hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        name="image"
        onChange={handleChange}
        ref={imgButton}
      />
      <div className="flex flex-col flex-1 space-y-2 items-center w-full justify-center">
        <div className="relative w-32 h-32 bg-gray-300 px-2 py-2 border border-gray-400 rounded-lg flex justify-center flex-col">
          {image !== "" && image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              onClick={() => {
                imgButton.current.click();
              }}
              className=" w-full h-full object-contain"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={() => {
                imgButton.current.click();
              }}
              className="w-12 h-12 text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:text-gray-700 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <Button
              onClickHandle={() => {
                imgButton.current.click();
              }}
              color="blue"
              size="sm"
              rounded="sm"
              text={`${!(image !== "" && image) ? "Add" : "Change"} Image`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadButton;
 
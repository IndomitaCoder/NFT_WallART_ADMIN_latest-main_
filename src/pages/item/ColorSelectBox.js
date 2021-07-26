import { useState } from "react";
import { CheckBox } from "../../components/Input";

const colors = [
  // { name: "pink", bgColor: "bg-pink-500", selectedColor: "ring-pink-500" },
  { name: "white", bgColor: "bg-white", selectedColor: "ring-white" },
  { name: "black", bgColor: "bg-black", selectedColor: "ring-black" },
  // {
  //   name: "purple",
  //   bgColor: "bg-purple-500",
  //   selectedColor: "ring-purple-500",
  // },
  // { name: "blue", bgColor: "bg-blue-500", selectedColor: "ring-blue-500" },
  // { name: "green", bgColor: "bg-green-500", selectedColor: "ring-green-500" },
  // {
  //   name: "yellow",
  //   bgColor: "bg-yellow-500",
  //   selectedColor: "ring-yellow-500",
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ColorSelectBox({ onChangeHandle, isColorHandle }) {
  // const [selectedColor, setSelectedColor] = useState();
  let status = [];
  for (let index = 0; index < colors.length; index++) status.push(false);
  const [colorSelectedStatus, setColorSelectedStatus] = useState(status);
  const [isColor, setIsColor] = useState(false)
  return (
    <div className="flex items-center">
      <div className="mt-4 mr-2">
        <CheckBox
          name="isColor"
          title="Has Color"
          onCheckHandle={(v) => {
            setIsColor(!isColor);
            isColorHandle(v);
          }}
          dvalue={false}
        />
      </div>
      <div className={`${!isColor?' opacity-40':''}`}>
        <div
          // value={selectedColor}
          // onChange={(v) => {
          //   setSelectedColor(v);
          //   onChangeHandle(v.name);
          // }}
        >
          <div className="mt-4 flex items-center space-x-3">
            {colors.map((color, i) => (
              <div
                key={color.name}
                value={color}
                onClick={() => {
                  let arr = colorSelectedStatus;
                  arr[i] = !arr[i];
                  let values = [];
                  arr.forEach((v,index) => {
                    if(v)values.push(colors[index].name);
                  });
                  onChangeHandle(values)
                  setColorSelectedStatus(arr);
                }}
                className={
                  classNames(
                    color.selectedColor,
                    colorSelectedStatus[i] ? "ring-2" : "",
                    // !active && checked ? "ring-2" : "",
                    isColor?"  cursor-pointer ":' cursor-not-allowed ',
                    "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center focus:outline-none"
                  )
                }
              >
                <span as="span" className="sr-only">
                  {color.name}
                </span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    color.bgColor,
                    "h-8 w-8 rounded-full text-green-800 relative border border-gray-500"
                  )}
                >
                  {colorSelectedStatus[i] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-4 h-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
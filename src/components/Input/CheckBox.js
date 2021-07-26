import React, { useState } from "react";

export default function CheckBox({name, title, onCheckHandle, dvalue}) {
  const [value, setValue] = useState(dvalue?true:false);
  return (
    <div className="relative flex items-start cursor-pointer">
      <div className="flex h-5 items-center">
        <input
          id={name}
          aria-describedby="comments-description"
          name={name}
          type="checkbox"
          value = {value}
          onChange={e=>{
            onCheckHandle(e.target.checked);
            setValue(e.target.checked)
          }}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
      </div>
      <div className="ml-3 text-sm cursor-pointer">
        <label htmlFor={name} className="font-medium text-gray-700">
          {title}
        </label>
      </div>
    </div>
  );
}
 
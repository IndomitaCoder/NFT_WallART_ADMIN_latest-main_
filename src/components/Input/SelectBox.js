import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectBox({
  url,
  isIncludedImage,
  query,
  name,
  onChangeHandle,
  defaultValue
}) {
  const useSelectBoxQuery = () => {
    return {
      ...useQuery([query], async () => {
        const result = await axios
          .get(`${process.env.REACT_APP_BACKEND_URL}${url}`)
          .catch((err) => {
            console.log(err);
          });
        return result.data;
      }),
    };
  };

  const initialData = useSelectBoxQuery();
  // if(initialData.isLoading) return<></>
  const [selected, setSelected] = useState(initialData?.data?.data[0]);
  useEffect(() => {
    if(defaultValue) {
      if(!initialData?.isLoading) {
        let arr = initialData?.data?.data?.filter(item => item?._id === defaultValue)
        setSelected(arr[0]);
        onChangeHandle(arr[0]?._id);
      }
      
    } else {
      setSelected(initialData?.data?.data[0]);
      onChangeHandle(initialData?.data?.data[0]?._id);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData.isLoading, initialData?.data?.data]);
  if (initialData.isLoading) return <></>;

  return (
    <Listbox
      value={selected}
      onChange={(v) => {
        setSelected(v);
        onChangeHandle(v._id);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-400 bg-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
              <div className=" flex">
                {isIncludedImage && (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${selected?.image}`}
                    alt=""
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                )}
                <span className="block truncate text-gray-700">
                  {selected?.name}
                </span>
              </div>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-300 border border-gray-400 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {initialData?.data?.data.map((item) => (
                  <Listbox.Option
                    key={item._id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-blue-400" : "text-gray-700",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center space-x-2">
                          {isIncludedImage && (
                            <img
                              src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                              alt=""
                              className="h-6 w-6 flex-shrink-0 rounded-full"
                            />
                          )}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-blue-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

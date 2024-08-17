import { useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";

const plans = [
  { name: "usd", limit: "USD ( $ )", icon:<img src={`${process.env.PUBLIC_URL}/assets/images/Mastercard-Logo.wine.svg`} className='w-6 h-6' alt=''/> },
  { name: "eth", limit: "ETH (eth)", icon:<img src={`${process.env.PUBLIC_URL}/assets/images/MetaMask_Fox.svg`} className='w-6 h-6' alt=''/> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PriceSelectBox({onChangeHandle, onPriceChangeHandle}) {
  const [selected, setSelected] = useState(plans[0]);
  useEffect(() => {
    onChangeHandle(plans[0].name)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // onChangeHandle(plans[0].name)
  const input = useRef(null);
  return (
    <div>
      <RadioGroup
        value={selected}
        onChange={(i) => {
          setSelected(i);
          onChangeHandle(i.name)
          input.current.focus();
        }}
      >
        <RadioGroup.Label className="sr-only"> Pricing plans </RadioGroup.Label>
        <div className="relative -space-y-px rounded-md bg-white">
          {plans.map((plan, planIdx) => (
            <RadioGroup.Option
              key={plan.name}
              value={plan}
              className={({ checked }) =>
                classNames(
                  planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                  planIdx === plans.length - 1
                    ? "rounded-bl-md rounded-br-md"
                    : "",
                  checked
                    ? " border-blue-400 z-10 bg-blue-200"
                    : "border-gray-300",
                  "relative border p-4 flex items-center justify-center cursor-pointer md:pl-4 md:pr-6 focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center text-sm text-center">
                    <span
                      className={classNames(
                        checked
                          ? "bg-blue-600 border-transparent"
                          : "bg-white border-gray-500",
                        active ? "ring-2 ring-offset-2 ring-blue-500" : "",
                        "h-4 w-4 rounded-full border flex items-center justify-center p-2"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        checked ? "text-blue-900" : "text-gray-900",
                        "ml-3 font-medium text-center"
                      )}
                    >
                      <input
                        className={`${
                          checked ? "text-blue-900" : "text-gray-400"
                        } w-full py-2 px-3 text-[#495057] border border-gray-400 rounded outline-none`}
                        placeholder="price"
                        name="price"
                        ref={input}
                        onChange={(v) => {onPriceChangeHandle(v.target.value)}}
                        // value={newUser.name}
                        // onChange={handleChange}
                      />
                    </RadioGroup.Label>
                  </span>
                  <RadioGroup.Description
                    as="span"
                    className={classNames(
                      checked ? "text-blue-700" : "text-gray-500",
                      "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right  flex justify-center items-center"
                    )}
                  >
                    <span className=" ml-2 flex flex-col items-center">
                      {plan.limit}
                      {plan.icon}
                    </span>
                  </RadioGroup.Description>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

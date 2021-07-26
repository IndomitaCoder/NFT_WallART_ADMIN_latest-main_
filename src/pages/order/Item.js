import React from "react";
import { useItemById } from "../../hooks/useItemById";

const ItemComponent = ({ id }) => {
  const { data, isLoading } = useItemById({ id: id });
  if (isLoading) return <></>;
  return (
    <div className="flex flex-col">
      <div>
        {data.data?.width}cm/{data.data?.height}cm
      </div>
      {/* <div>
        {data.data?.price}{" "}
        {data.data?.priceType === "usd"
          ? "$"
          : data.data?.priceType === "eth"
          ? "Eth"
          : ""}{" "}
      </div> */}
    </div>
  );
};

export default ItemComponent;
 
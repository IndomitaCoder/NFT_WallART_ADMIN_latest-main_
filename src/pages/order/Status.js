import React from "react";
import { useOrderStatusById } from "../../hooks/useOrderStatusById";

const StatusComponent = ({ id }) => {
  const { data, isLoading } = useOrderStatusById({ id: id });
  if (isLoading) return <></>;
  return (
    <div className="p-1 text-green-800 bg-green-300 w-20 text-center rounded-md">
      {data.data.name}
    </div>
  );
};

export default StatusComponent;
 
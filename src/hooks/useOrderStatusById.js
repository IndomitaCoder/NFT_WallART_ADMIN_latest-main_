import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useOrderStatusById({id}) {
  return {
    ...useQuery(["order_status-", id], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/order/order_status/${id}`)
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}

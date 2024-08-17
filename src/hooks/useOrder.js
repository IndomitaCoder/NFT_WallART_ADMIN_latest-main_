import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useOrder() {
  return {
    ...useQuery(["order-list"], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/order/`)
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}

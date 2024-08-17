import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useCustomer() {
  return {
    ...useQuery(["user-list"], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/`)
        .catch((err) => {
          console.log(err);
        });
      return result.data;
    }),
  };
}



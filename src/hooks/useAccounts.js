import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useAccounts() {
  let token = localStorage.getItem('token');;
  return {
    ...useQuery(["account-list"], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/account/`,
          {
            headers: {
              'token': token
            }
          }
        )
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}
 
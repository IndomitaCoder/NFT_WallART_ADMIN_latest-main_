import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useItemById({id}) {
  return {
    ...useQuery(["item-list", id], async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/item/${id}`)
        .catch((err) => {
          console.log(err);
        });
      return result?.data;
    }),
  };
}
 
import { getAllCouriers } from "@/api/admin.api";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useGetAllCouriers = () => {
  return useQuery({
    queryKey: ["courier"],
    queryFn: getAllCouriers,
  });
};
export const useSuspenseAllCouriers = () => {
  return useSuspenseQuery({
    queryKey: ["courier"],
    queryFn: getAllCouriers,
  });
};

import { getAllCouriers } from "@/api/admin.api";
import { CourierParams } from "@/types/courier.status";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useGetAllCouriers = (params: CourierParams) => {
  return useQuery({
    queryKey: ["courier", params],
    queryFn: () => getAllCouriers(params),
  });
};
export const useSuspenseAllCouriers = (params: CourierParams) => {
  return useSuspenseQuery({
    queryKey: ["courier", params],
    queryFn: () => getAllCouriers(params),
  });
};

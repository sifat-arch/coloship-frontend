import { approveCourier, getAllCouriers, rejectCourier } from "@/api/admin.api";
import { CourierParams } from "@/types/courier.status";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

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

export const useAcceptCourier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveCourier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier"] });
    },
  });
};
export const useRejectCourier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rejectCourier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier"] });
    },
  });
};

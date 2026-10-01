import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";
import { CourierParams, CourierProfileList } from "@/types/courier.status";

export const getAllCouriers = (params: CourierParams) => {
  return apiClient<apiResponse<CourierProfileList>>("/admin/all-couriers", {
    params,
  });
};
export const approveCourier = (id: string) => {
  return apiClient<apiResponse<CourierProfileList>>(
    `/admin/couriers/${id}/approve`,
    {
      method: "PATCH",
    },
  );
};
export const rejectCourier = (id: string) => {
  return apiClient<apiResponse<CourierProfileList>>(
    `/admin/couriers/${id}/reject`,
    {
      method: "PATCH",
    },
  );
};

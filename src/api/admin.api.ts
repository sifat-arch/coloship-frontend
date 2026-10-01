import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";
import { CourierParams, CourierProfileList } from "@/types/courier.status";

export const getAllCouriers = (params: CourierParams) => {
  return apiClient<apiResponse<CourierProfileList>>("/admin/all-couriers", {
    params,
  });
};

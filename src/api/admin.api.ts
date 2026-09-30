import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";
import { CourierProfileList } from "@/types/courier.status";

export const getAllCouriers = () => {
  return apiClient<apiResponse<CourierProfileList>>("/admin/all-couriers");
};

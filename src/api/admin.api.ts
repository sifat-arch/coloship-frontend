import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";
import { CourierParams, CourierProfileList } from "@/types/courier.status";
import { ShipmentItem, ShipmentParams } from "@/types/shipment.type";

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

// ১. সব শিপমেন্ট ফেচ করা
export const getAllShipments = (params: ShipmentParams) => {
  return apiClient<apiResponse<ShipmentItem[]>>("/admin/shipments", {
    params,
  });
};

// ২. ড্রপডাউনের জন্য অ্যাভেইলেবল কুরিয়ার ফেচ করা
export const getAvailableCouriers = () => {
  return apiClient<apiResponse<CourierProfileList>>("/admin/available-courier");
};

// ৩. কুরিয়ার অ্যাসাইন করা
export const assignCourierToShipment = (
  shipmentId: string,
  courierProfileId: string,
) => {
  return apiClient<apiResponse<ShipmentItem>>(
    `/admin/shipments/${shipmentId}/assign`,
    {
      method: "PATCH",
      body: JSON.stringify({ courierProfileId }),
    },
  );
};

// ৪. কুরিয়ার আন-অ্যাসাইন করা
export const unassignCourierFromShipment = (shipmentId: string) => {
  return apiClient<apiResponse<ShipmentItem>>(
    `/admin/shipments/${shipmentId}/unassign`,
    {
      method: "PATCH",
    },
  );
};

import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";
import {
  CustomerAddress,
  CreateAddressPayload,
  CreateShipmentPayload,
  CreatedShipmentResponse,
  InitiatePaymentPayload,
  InitiatePaymentResponse,
  CustomerShipmentItem,
  CustomerShipmentParams,
  CancelShipmentPayload,
  PaymentDetails,
} from "@/types/customer.type";

// ১. সেভ করা সকল ঠিকানা আনা
export const getSavedAddresses = () => {
  return apiClient<apiResponse<CustomerAddress[]>>("/addresses", {
    method: "GET",
  });
};

// ২. নতুন ঠিকানা সেভ করা
export const createAddress = (payload: CreateAddressPayload) => {
  return apiClient<apiResponse<CustomerAddress>>("/addresses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// ৩. নতুন পার্সেল বুকিং করা
export const createShipment = (payload: CreateShipmentPayload) => {
  return apiClient<apiResponse<CreatedShipmentResponse>>("/shipments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// ৪. পেমেন্ট শুরু করা (bKash অথবা COD)
export const initiatePayment = (payload: InitiatePaymentPayload) => {
  return apiClient<apiResponse<InitiatePaymentResponse>>("/payments/initiate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// ৫. কাস্টমারের সকল পার্সেল তালিকা আনা (ফিল্টারিং ও পেজিনেশন সহ)
export const getMyShipments = (params?: CustomerShipmentParams) => {
  // খালি বা "ALL" ভ্যালুগুলো ক্লিন করা
  const queryParams: Record<string, any> = {};
  if (params?.page) queryParams.page = params.page;
  if (params?.limit) queryParams.limit = params.limit;
  if (params?.searchTerm?.trim()) queryParams.searchTerm = params.searchTerm.trim();
  if (params?.status && params.status !== "ALL") queryParams.status = params.status;
  if (params?.deliveryType && params.deliveryType !== "ALL") queryParams.deliveryType = params.deliveryType;

  return apiClient<apiResponse<CustomerShipmentItem[]>>("/shipments/my-shipments", {
    method: "GET",
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
};

// ৬. একক পার্সেলের সম্পূর্ণ বিস্তারিত এবং টাইমলাইন আনা
export const getShipmentDetails = (id: string) => {
  return apiClient<apiResponse<CustomerShipmentItem>>(`/shipments/${id}`, {
    method: "GET",
  });
};

// ৭. পার্সেল ক্যানসেল করা (CREATED স্ট্যাটাসে থাকলে)
export const cancelShipment = (id: string, payload?: CancelShipmentPayload) => {
  return apiClient<apiResponse<CustomerShipmentItem>>(`/shipments/${id}/cancel`, {
    method: "PATCH",
    body: payload ? JSON.stringify(payload) : undefined,
  });
};

// ৮. ট্র্যাকিং নম্বর দিয়ে পার্সেল ট্র্যাক করা
export const trackShipment = (trackingNumber: string) => {
  return apiClient<apiResponse<CustomerShipmentItem>>(`/shipments/track/${trackingNumber}`, {
    method: "GET",
  });
};

// ৯. পেমেন্টের বিস্তারিত আনা
export const getPaymentDetails = (paymentId: string) => {
  return apiClient<apiResponse<PaymentDetails>>(`/payments/details/${paymentId}`, {
    method: "GET",
  });
};

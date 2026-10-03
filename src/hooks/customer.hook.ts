import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelShipment,
  createAddress,
  createShipment,
  getMyShipments,
  getSavedAddresses,
  getShipmentDetails,
  initiatePayment,
  trackShipment,
} from "@/api/customer.api";
import {
  CancelShipmentPayload,
  CreateAddressPayload,
  CreateShipmentPayload,
  CustomerShipmentParams,
  InitiatePaymentPayload,
} from "@/types/customer.type";

// ==========================================
// Address Hooks
// ==========================================

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getSavedAddresses,
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => createAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

// ==========================================
// Parcel Booking & Payment Hooks
// ==========================================

export const useCreateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateShipmentPayload) => createShipment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-shipments"] });
    },
  });
};

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: (payload: InitiatePaymentPayload) => initiatePayment(payload),
  });
};

// ==========================================
// My Shipments & Tracking Hooks
// ==========================================

// ১. কাস্টমারের সকল পার্সেল ফেচ করা (ফিল্টার ও পেজিনেশন স্টেট অনুযায়ী)
export const useGetMyShipments = (params?: CustomerShipmentParams) => {
  return useQuery({
    queryKey: ["my-shipments", params],
    queryFn: () => getMyShipments(params),
  });
};

// ২. নির্দিষ্ট একটি পার্সেলের সম্পূর্ণ বিস্তারিত এবং টাইমলাইন ইভেন্টস ফেচ করা
export const useGetShipmentDetails = (id?: string | null) => {
  return useQuery({
    queryKey: ["shipment-details", id],
    queryFn: () => getShipmentDetails(id!),
    enabled: Boolean(id),
  });
};

// ৩. ট্র্যাকিং নম্বর দিয়ে সরাসরি ট্র্যাক করা
export const useTrackShipment = (trackingNumber?: string | null) => {
  return useQuery({
    queryKey: ["track-shipment", trackingNumber],
    queryFn: () => trackShipment(trackingNumber!),
    enabled: Boolean(trackingNumber && trackingNumber.trim().length > 0),
  });
};

// ৪. পার্সেল ক্যানসেল করা
export const useCancelShipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload?: CancelShipmentPayload;
    }) => cancelShipment(id, payload),
    onSuccess: (_, variables) => {
      // পার্সেল ক্যানসেল হলে টেবিল এবং বিস্তারিত শিটের ক্যাশ ইনভ্যালিডেট হবে
      queryClient.invalidateQueries({ queryKey: ["my-shipments"] });
      queryClient.invalidateQueries({
        queryKey: ["shipment-details", variables.id],
      });
    },
  });
};

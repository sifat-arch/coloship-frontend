import {
  approveCourier,
  assignCourierToShipment,
  getAllCouriers,
  getAllShipments,
  getAllUsers,
  getAvailableCouriers,
  rejectCourier,
  unassignCourierFromShipment,
  updateUserStatus,
} from "@/api/admin.api";
import { CourierParams } from "@/types/courier.status";
import { ShipmentParams } from "@/types/shipment.type";
import { UserParams, UserStatus } from "@/types/user.type";
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

// ১. রেগুলার কুয়েরি ও সাসপেন্স কুয়েরি
export const useGetAllShipments = (params: ShipmentParams) => {
  return useQuery({
    queryKey: ["shipments", params],
    queryFn: () => getAllShipments(params),
  });
};

export const useSuspenseAllShipments = (params: ShipmentParams) => {
  return useSuspenseQuery({
    queryKey: ["shipments", params],
    queryFn: () => getAllShipments(params),
  });
};

// ২. অ্যাভেইলেবল কুরিয়ার কুয়েরি
export const useGetAvailableCouriers = () => {
  return useQuery({
    queryKey: ["available-couriers"],
    queryFn: () => getAvailableCouriers(),
  });
};

// ৩. কুরিয়ার অ্যাসাইন মিউটেশন
export const useAssignCourier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      courierProfileId,
    }: {
      shipmentId: string;
      courierProfileId: string;
    }) => assignCourierToShipment(shipmentId, courierProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });
};

// ৪. কুরিয়ার আন-অ্যাসাইন মিউটেশন
export const useUnassignCourier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shipmentId: string) => unassignCourierFromShipment(shipmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });
};

// ৫. ইউজার ফেচিং কুয়েরি ও সাসপেন্স কুয়েরি
export const useGetAllUsers = (params: UserParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
  });
};

export const useSuspenseAllUsers = (params: UserParams) => {
  return useSuspenseQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
  });
};

// ৬. ইউজার স্ট্যাটাস পরিবর্তন মিউটেশন
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: UserStatus;
    }) => updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

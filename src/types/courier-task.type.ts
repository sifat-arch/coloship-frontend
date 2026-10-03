import { AddressInfo, ShipmentStatus } from "./shipment.type";

export interface TrackingEventItem {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  description: string;
  location?: string | null;
  createdBy?: string | null;
  createdAt: string;
}

export interface CourierTaskItem {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  deliveryType: "STANDARD" | "EXPRESS";
  weight: number;
  deliveryFee: number;
  codAmount: number;
  parcelDescription?: string;
  pickedUpAt?: string | null;
  deliveredAt?: string | null;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  pickupAddress: AddressInfo;
  deliveryAddress: AddressInfo;
  trackingEvents?: TrackingEventItem[];
  payment?: {
    id: string;
    status: string;
    paymentMethod: string;
    amount: number;
  } | null;
}

export interface RespondTaskPayload {
  action: "ACCEPT" | "REJECT";
  reason?: string;
}

export interface UpdateTaskStatusPayload {
  status:
    | "PICKED_UP"
    | "IN_TRANSIT"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "DELIVERY_FAILED"
    | "CANCELLED"
    | "RETURNED";
  note?: string;
  location?: string;
}

export interface CourierDashboardStats {
  activeTasks: number;
  completedToday: number;
  totalCompleted: number;
  todayCodCollected: number;
  isAvailable: boolean;
}

export interface UpdateCourierProfilePayload {
  phone?: string;
  vehicleType?: "BIKE" | "BICYCLE" | "MOTORCYCLE" | "VAN" | "TRUCK";
  vehicleNumber?: string;
  licenseNumber?: string;
}

export type ShipmentStatus =
  | "CREATED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "PICKUP_REQUESTED"
  | "COURIER_ASSIGNED"
  | "PICKED_UP"
  | "AT_ORIGIN_HUB"
  | "IN_TRANSIT"
  | "AT_DESTINATION_HUB"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED"
  | "CANCELLED"
  | "RETURNED";

export interface AddressInfo {
  id: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  area: string;
  city: string;
}

export interface ShipmentItem {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  deliveryType: "STANDARD" | "EXPRESS";
  weight: number;
  deliveryFee: number;
  codAmount: number;
  parcelDescription?: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  courier?: {
    id: string;
    phone: string;
    vehicleType: string;
    user: {
      name: string;
      email: string;
    };
  } | null;
  pickupAddress: AddressInfo;
  deliveryAddress: AddressInfo;
  payment?: {
    status: string;
    paymentMethod: string;
    amount: number;
  } | null;
}

export interface ShipmentParams {
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

import { ShipmentStatus } from "./shipment.type";
import { TrackingEventItem } from "./courier-task.type";

export interface CustomerAddress {
  id: string;
  userId: string;
  label: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  area: string;
  city: string;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isDefault: boolean;
  createdAt?: string;
}

export interface CreateAddressPayload {
  label: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  area: string;
  city: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface CreateShipmentPayload {
  pickupAddressId?: string;
  deliveryAddressId: string;
  deliveryType: "STANDARD" | "EXPRESS";
  weight: number;
  codAmount: number;
  parcelDescription?: string;
}

export interface CreatedShipmentResponse {
  id: string;
  trackingNumber: string;
  customerId: string;
  pickupAddressId: string;
  deliveryAddressId: string;
  deliveryType: "STANDARD" | "EXPRESS";
  status: ShipmentStatus | string;
  weight: number;
  deliveryFee: number;
  codAmount: number;
  parcelDescription?: string;
  createdAt: string;
  pickupAddress?: CustomerAddress;
  deliveryAddress?: CustomerAddress;
}

export interface InitiatePaymentPayload {
  shipmentId: string;
  method: "BKASH" | "COD";
}

export interface InitiatePaymentResponse {
  paymentUrl?: string;
  bkashPaymentId?: string;
  message?: string;
  payment?: {
    id: string;
    shipmentId: string;
    method: "BKASH" | "COD";
    status: string;
    amount: number;
  };
}

// ==========================================
// Customer My Shipments Types
// ==========================================

export interface CustomerShipmentItem {
  id: string;
  trackingNumber: string;
  customerId: string;
  status: ShipmentStatus;
  deliveryType: "STANDARD" | "EXPRESS";
  weight: number;
  deliveryFee: number;
  codAmount: number;
  parcelDescription?: string | null;
  createdAt: string;
  updatedAt?: string;
  pickedUpAt?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  pickupAddress: CustomerAddress;
  deliveryAddress: CustomerAddress;
  trackingEvents?: TrackingEventItem[];
  payment?: {
    id: string;
    method: "BKASH" | "COD";
    status: "PENDING" | "PAID" | "FAILED" | "CANCELED" | "REFUNDED" | string;
    amount: number;
    paidAt?: string | null;
    refundTrxId?: string | null;
    refundAmount?: number | null;
    refundedAt?: string | null;
    refundReason?: string | null;
  } | null;
}

export interface CustomerShipmentParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  deliveryType?: string;
}

export interface CustomerShipmentMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CustomerShipmentsListResponse {
  data: CustomerShipmentItem[];
  meta: CustomerShipmentMeta;
}

export interface CancelShipmentPayload {
  reason?: string;
}

export interface PaymentDetails {
  id: string;
  shipmentId: string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELED" | "REFUNDED" | "UNPAID" | string;
  method: "BKASH" | "COD" | string;
  amount: number;
  currency: string;
  paymentGateway?: string;
  merchantInvoiceNumber?: string;
  paymentUrl?: string | null;
  bkashPaymentId?: string | null;
  bkashTrxId?: string | null;
  payerReference?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
  shipment?: CustomerShipmentItem;
}

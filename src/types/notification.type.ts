export type NotificationType = "SHIPMENT" | "PAYMENT" | "SYSTEM" | "DELIVERY";

export interface AppNotification {
  id: string;
  userId: string;
  CourierId?: string | null;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationFilterParams {
  page?: number;
  limit?: number;
  isRead?: boolean;
}

export interface UnreadNotificationCountResponse {
  unreadCount: number;
}

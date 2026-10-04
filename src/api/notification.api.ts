import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";
import {
  AppNotification,
  NotificationFilterParams,
  UnreadNotificationCountResponse,
} from "@/types/notification.type";

// ১. ইউজারের নোটিফিকেশন লিস্ট ফেচ করা
export const getUserNotifications = (params?: NotificationFilterParams) => {
  const queryParams: Record<string, any> = {};
  if (params?.page) queryParams.page = params.page;
  if (params?.limit) queryParams.limit = params.limit;
  if (params?.isRead !== undefined) queryParams.isRead = params.isRead;

  return apiClient<apiResponse<AppNotification[]>>("/notifications", {
    method: "GET",
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
};

// ২. আনরিড নোটিফিকেশন সংখ্যা পাওয়া
export const getUnreadNotificationCount = () => {
  return apiClient<apiResponse<UnreadNotificationCountResponse>>(
    "/notifications/unread-count",
    {
      method: "GET",
    }
  );
};

// ৩. একটি নির্দিষ্ট নোটিফিকেশন রিড হিসেবে মার্ক করা
export const markNotificationAsRead = (id: string) => {
  return apiClient<apiResponse<AppNotification>>(`/notifications/${id}/read`, {
    method: "PATCH",
  });
};

// ৪. সব নোটিফিকেশন রিড হিসেবে মার্ক করা
export const markAllNotificationsAsRead = () => {
  return apiClient<apiResponse<{ count: number }>>(
    "/notifications/mark-all-read",
    {
      method: "PATCH",
    }
  );
};

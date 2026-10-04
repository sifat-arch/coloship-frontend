import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/api/notification.api";
import { NotificationFilterParams } from "@/types/notification.type";

import { useGetMe } from "./auth.hook";

// ১. নোটিফিকেশন লিস্ট ফেচিং হুক
export const useGetNotifications = (params?: NotificationFilterParams) => {
  const { data: userData } = useGetMe();
  const userId = userData?.data?.id;

  return useQuery({
    queryKey: ["notifications", userId, params],
    queryFn: () => getUserNotifications(params),
    enabled: Boolean(userId),
    refetchInterval: 10000, // প্রতি ১০ সেকেন্ড পর পর রিফ্রেশ
  });
};

// ২. আনরিড কাউন্ট ফেচিং হুক
export const useGetUnreadNotificationCount = () => {
  const { data: userData } = useGetMe();
  const userId = userData?.data?.id;

  return useQuery({
    queryKey: ["notifications-unread-count", userId],
    queryFn: getUnreadNotificationCount,
    enabled: Boolean(userId),
    refetchInterval: 10000, // প্রতি ১০ সেকেন্ড পর পর আনরিড কাউন্ট চেক
  });
};

// ৩. সিঙ্গেল নোটিফিকেশন রিড মার্ক করার মিউটেশন
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
};

// ৪. সকল নোটিফিকেশন রিড মার্ক করার মিউটেশন
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
};

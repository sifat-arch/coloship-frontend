"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  CheckCheck,
  Package,
  CreditCard,
  Truck,
  Info,
  Loader2,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetNotifications,
  useGetUnreadNotificationCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "@/hooks/notification.hook";
import { AppNotification, NotificationType } from "@/types/notification.type";
import { cn } from "cn";

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "PAYMENT":
      return (
        <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      );
    case "SHIPMENT":
      return <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    case "DELIVERY":
      return <Truck className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    case "SYSTEM":
    default:
      return <Info className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
  }
}

function getNotificationBg(type: NotificationType) {
  switch (type) {
    case "PAYMENT":
      return "bg-emerald-500/10 border-emerald-500/20";
    case "SHIPMENT":
      return "bg-blue-500/10 border-blue-500/20";
    case "DELIVERY":
      return "bg-amber-500/10 border-amber-500/20";
    case "SYSTEM":
    default:
      return "bg-purple-500/10 border-purple-500/20";
  }
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Queries
  const { data: countData } = useGetUnreadNotificationCount();
  const unreadCount = countData?.data?.unreadCount || 0;

  const { data: notificationsData, isLoading } = useGetNotifications({
    limit: 15,
  });
  const notifications = notificationsData?.data || [];

  // Mutations
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } =
    useMarkAllNotificationsAsRead();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (item: AppNotification) => {
    if (!item.isRead) {
      markAsRead(item.id);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Bell Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground hover:text-foreground h-9 w-9 rounded-full transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />

        {/* Unread Counter Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-background animate-in zoom-in-50">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border bg-card shadow-xl z-50 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-foreground">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground hover:text-primary gap-1 px-2"
                onClick={() => markAllAsRead()}
                disabled={isMarkingAll}
              >
                {isMarkingAll ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <CheckCheck className="w-3.5 h-3.5" />
                )}
                Mark all read
              </Button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-border/60">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-xs">Loading notifications...</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-muted/80 flex items-center justify-center mb-2">
                  <Bell className="w-5 h-5 opacity-40" />
                </div>
                <p className="text-xs font-semibold text-foreground">
                  No notifications yet
                </p>
                <p className="text-[11px] mt-0.5 text-muted-foreground">
                  Updates on your shipments, refunds and deliveries will appear
                  here.
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={cn(
                    "flex items-start gap-3 p-3.5 text-left transition-colors cursor-pointer hover:bg-muted/50",
                    !item.isRead && "bg-primary/[0.03] dark:bg-primary/[0.05]",
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                      getNotificationBg(item.type),
                    )}
                  >
                    {getNotificationIcon(item.type)}
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={cn(
                          "text-xs font-semibold text-foreground truncate",
                          !item.isRead && "font-bold text-primary",
                        )}
                      >
                        {item.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {formatTimeAgo(item.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  {/* Unread indicator dot */}
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

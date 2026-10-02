import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";
import { CourierProfile } from "@/types/courier.status";
import {
  CourierDashboardStats,
  CourierTaskItem,
  RespondTaskPayload,
  UpdateCourierProfilePayload,
  UpdateTaskStatusPayload,
} from "@/types/courier-task.type";

// ১. কুরিয়ারের অ্যাসাইন করা কাজগুলো আনা
export const getMyAssignments = (status?: string) => {
  return apiClient<apiResponse<CourierTaskItem[]>>("/courier/assignments", {
    params: status && status !== "ALL" ? { status } : undefined,
  });
};

// ২. কাজের দায়িত্ব গ্রহণ (ACCEPT) বা বর্জন (REJECT) করা
export const respondToAssignment = (
  taskId: string,
  payload: RespondTaskPayload,
) => {
  return apiClient<apiResponse<CourierTaskItem>>(
    `/courier/assignments/${taskId}/respond`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
};

// ৩. ডেলিভারি প্রগ্রেস ও স্ট্যাটাস আপডেট করা (PICKED_UP / DELIVERED ইত্যাদি)
export const updateTaskStatus = (
  taskId: string,
  payload: UpdateTaskStatusPayload,
) => {
  return apiClient<apiResponse<CourierTaskItem>>(
    `/courier/assignments/${taskId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
};

// ৪. কুরিয়ার ড্যাশবোর্ড পরিসংখ্যান আনা
export const getCourierDashboardStats = () => {
  return apiClient<apiResponse<CourierDashboardStats>>(
    "/courier/dashboard-stats",
  );
};

// ৫. অনলাইন / অফলাইন টগল করা
export const toggleAvailability = (isAvailable?: boolean) => {
  return apiClient<apiResponse<{ id: string; isAvailable: boolean }>>(
    "/courier/availability",
    {
      method: "PATCH",
      body: JSON.stringify({ isAvailable }),
    },
  );
};

// ৬. কুরিয়ার প্রোফাইল তথ্য আনা
export const getCourierProfile = () => {
  return apiClient<apiResponse<CourierProfile>>("/courier/profile");
};

// ৭. কুরিয়ার প্রোফাইল তথ্য আপডেট করা
export const updateCourierProfile = (payload: UpdateCourierProfilePayload) => {
  return apiClient<apiResponse<CourierProfile>>("/courier/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  getCourierDashboardStats,
  getCourierProfile,
  getMyAssignments,
  respondToAssignment,
  toggleAvailability,
  updateCourierProfile,
  updateTaskStatus,
} from "@/api/courier.api";
import {
  RespondTaskPayload,
  UpdateCourierProfilePayload,
  UpdateTaskStatusPayload,
} from "@/types/courier-task.type";

export const useGetMyAssignments = (status?: string) => {
  return useQuery({
    queryKey: ["courier-tasks", status],
    queryFn: () => getMyAssignments(status),
  });
};

export const useSuspenseMyAssignments = (status?: string) => {
  return useSuspenseQuery({
    queryKey: ["courier-tasks", status],
    queryFn: () => getMyAssignments(status),
  });
};

export const useRespondAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: RespondTaskPayload }) =>
      respondToAssignment(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["courier-stats"] });
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: UpdateTaskStatusPayload;
    }) => updateTaskStatus(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["courier-stats"] });
    },
  });
};

// কুরিয়ার ড্যাশবোর্ড পরিসংখ্যান হুক
export const useGetCourierDashboardStats = () => {
  return useQuery({
    queryKey: ["courier-stats"],
    queryFn: () => getCourierDashboardStats(),
  });
};

// কুরিয়ার অনলাইন/অফলাইন টগল মিউটেশন
export const useToggleAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isAvailable?: boolean) => toggleAvailability(isAvailable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-stats"] });
      queryClient.invalidateQueries({ queryKey: ["courier-profile"] });
    },
  });
};

// কুরিয়ার প্রোফাইল ফেচিং হুক
export const useGetCourierProfile = () => {
  return useQuery({
    queryKey: ["courier-profile"],
    queryFn: () => getCourierProfile(),
  });
};

export const useSuspenseCourierProfile = () => {
  return useSuspenseQuery({
    queryKey: ["courier-profile"],
    queryFn: () => getCourierProfile(),
  });
};

// কুরিয়ার প্রোফাইল আপডেট মিউটেশন
export const useUpdateCourierProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCourierProfilePayload) =>
      updateCourierProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courier-profile"] });
    },
  });
};
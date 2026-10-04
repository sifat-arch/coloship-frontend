import {
  applyAsCourier,
  forgotPassword,
  googleOAuth,
  resetPassword,
  UserGetMe,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccount,
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: userRegistration,
  });
};
export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: UserGetMe,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
export const useGoogleOAuth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: googleOAuth,
    onSuccess: () => {
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
export const useApplyAsCourier = () => {
  return useMutation({
    mutationFn: applyAsCourier,
  });
};

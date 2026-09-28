import {
  googleOAuth,
  UserGetMe,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
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
  return useMutation({
    mutationFn: userLogout,
  });
};
export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};

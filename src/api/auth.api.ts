import apiClient from "@/lib/apiClient";
import { ILoginPayload, IRegisterPayload } from "@/types";

export const userLogin = (payload: ILoginPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};
export const userRegistration = (payload: IRegisterPayload) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};
export const userLogout = () => {
  return apiClient("/auth/logout", {
    method: "POST",
  });
};
export const UserGetMe = () => {
  return apiClient("/auth/me");
};
export const googleOAuth = (payload: { idToken: string }) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};

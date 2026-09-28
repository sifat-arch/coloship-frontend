import apiClient from "@/lib/apiClient";

export const userLogin = (payload: { email: string; password: string }) => {
  return apiClient("/auth/login", {
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

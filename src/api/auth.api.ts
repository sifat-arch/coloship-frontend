import apiClient from "@/lib/apiClient";
import {
  courierApplicationPayload,
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
  IVerifyAccountPayload,
} from "@/types";

export const userLogin = (payload: ILoginPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};
export const verifyAccount = (payload: IVerifyAccountPayload) => {
  return apiClient("/auth/verify-customer-email", {
    method: "POST",
    body: payload,
  });
};
export const forgotPassword = (payload: IForgotPasswordPayload) => {
  return apiClient("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
};
export const resetPassword = (payload: IResetPasswordPayload) => {
  return apiClient("/auth/reset-password", {
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
export const applyAsCourier = (payload: courierApplicationPayload) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);
  formData.append("profileImage", payload.profileImage);
  return apiClient("/auth/register-courier", {
    method: "POST",
    body: formData,
  });
};

import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/types";

export interface UploadProfileImageResponse {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  imagePublicId?: string;
  role: string;
}

// প্রোফাইল ছবি আপলোড করা (FormData এর মাধ্যমে)
export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append("profile-image", file);

  return apiClient<apiResponse<UploadProfileImageResponse>>("/user/profile-image", {
    method: "PATCH",
    body: formData,
  });
};

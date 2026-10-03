import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileImage } from "@/api/user.api";

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
    onSuccess: () => {
      // ইউজারের তথ্য এবং কুরিয়ার প্রোফাইল দুটোই ইনভ্যালিডেট করা
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["courier-profile"] });
    },
  });
};

"use client";

import React, { useRef, useState } from "react";
import { useUploadProfileImage } from "@/hooks/user.hook";
import { toast } from "@/components/ui/toast";
import { Camera, Loader2, User, Upload } from "lucide-react";
import { cn } from "cn";

interface ProfileImageUploaderProps {
  currentImageUrl?: string | null;
  fallbackName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  editable?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12 text-base",
  md: "w-20 h-20 text-2xl",
  lg: "w-28 h-28 text-3xl",
  xl: "w-36 h-36 text-4xl",
};

export default function ProfileImageUploader({
  currentImageUrl,
  fallbackName = "User",
  size = "lg",
  className,
  editable = true,
}: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate: uploadImage, isPending } = useUploadProfileImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, WEBP).",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "File too large",
        description: "Image size must be less than 5 MB.",
      });
      return;
    }

    // Set local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Call API mutation
    uploadImage(file, {
      onSuccess: () => {
        toast.add({
          title: "Profile Picture Updated",
          description: "Your new profile photo has been saved.",
        });
      },
      onError: (err: any) => {
        setPreviewUrl(null); // revert preview on error
        toast.add({
          title: "Upload Failed",
          description:
            err?.data?.message || err?.message || "Could not upload image.",
        });
      },
      onSettled: () => {
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  const handleTriggerUpload = () => {
    if (!editable || isPending) return;
    fileInputRef.current?.click();
  };

  const displayImage = previewUrl || currentImageUrl;
  const initial = fallbackName.trim() ? fallbackName.trim().charAt(0).toUpperCase() : "U";

  return (
    <div className={cn("relative inline-block select-none", className)}>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={!editable || isPending}
      />

      {/* Avatar Container */}
      <div
        onClick={handleTriggerUpload}
        className={cn(
          "relative rounded-2xl overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center font-bold text-primary shadow-sm transition-all group",
          sizeClasses[size],
          editable && !isPending && "cursor-pointer hover:border-primary hover:shadow-md"
        )}
        title={editable ? "Click to change profile picture" : undefined}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={fallbackName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}

        {/* Hover / Loading Overlay */}
        {editable && (
          <div
            className={cn(
              "absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center gap-1 transition-opacity",
              isPending
                ? "opacity-100 backdrop-blur-2xs"
                : "opacity-0 group-hover:opacity-100"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-[10px] font-medium tracking-wide">Saving...</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 drop-shadow-sm" />
                <span className="text-[10px] font-medium tracking-wide">Change</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Floating Camera Button Badge for clarity */}
      {editable && !isPending && (
        <button
          type="button"
          onClick={handleTriggerUpload}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border-2 border-background"
          title="Upload new image"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

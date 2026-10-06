"use client";
import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginComponent = () => {
  const { mutate: googleLogin } = useGoogleOAuth();
  const router = useRouter();
  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong,please try again",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: (res: any) => {
          toast.add({
            title: "Logged in with google successfully",
            description: "Welcome Back",
            type: "success",
          });
          const userRole = res?.data?.user?.role;
          if (userRole === "ADMIN") {
            router.push("/admin");
          } else if (userRole === "COURIER") {
            router.push("/courier");
          } else if (userRole === "CUSTOMER") {
            router.push("/customer");
          } else {
            router.push("/");
          }
        },
        onError: (err) => {
          toast.add({
            title: err.message || "Google OAuth Failed",
            description: "Something went wrong,please try again",
            type: "error",
          });
        },
      },
    );
  };
  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong,please try again",
    });
  };
  return (
    <div className="flex w-full justify-center">
      <GoogleLogin
        text="signin_with"
        shape="pill"
        theme="outline"
        size="large"
        width="323"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
};

export default GoogleLoginComponent;

import Logo from "@/assets/svg/logo";
import VerifyAccountFrom from "@/components/from/verify-account-from";
import Link from "next/link";
import { Suspense } from "react";

const VerifyAccountPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Logo />
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<p>Loading...</p>}>
              <VerifyAccountFrom />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;

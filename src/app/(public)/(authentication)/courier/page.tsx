import Logo from "@/assets/svg/logo";
import ApplyCourierForm from "@/components/from/apply-courier-from";

import Image from "next/image";
import Link from "next/link";

export default function ApplyCourier() {
  return (
    <div className="grid min-h-screen lg:grid-cols-3">
      <div className="flex flex-col col-span-2 gap-4 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-xl">
            <ApplyCourierForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:flex lg:items-center lg:justify-center bg-muted overflow-hidden">
        <Image
          src="/apply-courier.jpg"
          alt="Apply Courier"
          fill
          priority
          className="object-contain p-8 dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

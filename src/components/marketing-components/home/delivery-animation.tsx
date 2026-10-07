// "use client";

// import { useEffect, useState } from "react";
//

// interface DeliveryAnimationProps {
//   className?: string;
// }

// export default function DeliveryAnimation({
//   className = "",
// }: DeliveryAnimationProps) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <div
//         className={`flex items-center justify-center rounded-2xl bg-muted/20 ${className}`}
//       >
//         <span className="size-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className={`relative flex items-center justify-center ${className}`}>
//       <Lottie
//         src="/animation/delevery-service-lotty.json"
//         loop={true}
//         autoplay={true}
//         className="w-full h-full max-h-52 object-contain pointer-events-none drop-shadow-md"
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";

interface DeliveryAnimationProps {
  className?: string;
  lottieClassName?: string;
  loop?: boolean;
  autoplay?: boolean;
  animationData: string;
  rendererSettings?: Record<string, any>;
}

export default function DeliveryAnimation({
  className = "",
  lottieClassName,
  loop = true,
  autoplay = true,
  animationData,
  rendererSettings,
}: DeliveryAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-muted/20 ${className}`}
      >
        <span className="size-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Lottie
        src={animationData}
        loop={loop}
        autoplay={autoplay}
        rendererSettings={rendererSettings}
        className={
          lottieClassName ||
          "w-full h-full max-h-52 object-contain pointer-events-none drop-shadow-md"
        }
      />
    </div>
  );
}

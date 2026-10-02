import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/logo.svg" alt="Coloship logo" width={36} height={36} />
      <span className="text-xl font-bold tracking-tight">Coloship</span>
    </div>
  );
}

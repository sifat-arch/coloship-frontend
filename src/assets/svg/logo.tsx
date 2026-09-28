import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Image src="/logo.svg" alt="Coloship logo" width={40} height={40} />
      <span className="text-lg font-bold">Coloship</span>
    </>
  );
}

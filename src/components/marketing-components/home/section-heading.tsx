import { cn } from "cn";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) => {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCentered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </span>
      )}

      <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

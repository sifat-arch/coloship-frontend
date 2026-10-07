"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a Sheet");
  }
  return context;
}

interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: setControlledOpen,
  children,
}: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      setControlledOpen?.(nextOpen);
    },
    [isControlled, setControlledOpen]
  );

  return (
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  render,
  children,
  onClick,
  ...props
}: {
  render?: React.ReactElement;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}) {
  const { onOpenChange } = useSheet();
  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      onOpenChange(true);
    }
  };

  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<any>, {
      ...props,
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

function SheetClose({
  render,
  children,
  onClick,
  ...props
}: {
  render?: React.ReactElement;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}) {
  const { onOpenChange } = useSheet();
  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      onOpenChange(false);
    }
  };

  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<any>, {
      ...props,
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

function SheetPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SheetOverlay({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const { onOpenChange } = useSheet();
  return (
    <motion.div
      data-slot="sheet-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          onOpenChange(false);
        }
      }}
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

const slideVariants = {
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
};

const sheetSpringTransition: Transition = {
  type: "spring",
  damping: 32,
  stiffness: 340,
  mass: 0.85,
};

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
  style?: React.CSSProperties;
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  style,
  ...props
}: SheetContentProps) {
  const { open, onOpenChange } = useSheet();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onOpenChange]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden" data-slot="sheet-portal">
          <SheetOverlay />
          <motion.div
            key="sheet-content"
            data-slot="sheet-content"
            data-side={side}
            variants={slideVariants[side]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sheetSpringTransition}
            style={style}
            className={cn(
              "fixed z-50 flex flex-col gap-4 bg-card text-sm text-card-foreground shadow-2xl custom-scrollbar",
              side === "right" && "inset-y-0 right-0 h-full w-full sm:max-w-lg border-l border-border/80",
              side === "left" && "inset-y-0 left-0 h-full w-full sm:max-w-lg border-r border-border/80",
              side === "top" && "inset-x-0 top-0 h-auto border-b border-border/80",
              side === "bottom" && "inset-x-0 bottom-0 h-auto max-h-[90vh] rounded-t-2xl border-t border-border/80",
              className
            )}
            {...(props as any)}
          >
            {children}
            {showCloseButton && (
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 z-20 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200"
                size="icon-sm"
                aria-label="Close"
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-semibold text-foreground",
        className
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

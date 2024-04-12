import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-secondary-foreground/60 shadow hover:bg-primary/90",
        outline:
          "border border-[#D4D4D8] bg-transparent text-secondary-foreground text-opacity-10 hover:bg-[rgba(112,119,128,0.00)] hover:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)] focus-visible:[box-shadow:0px_0px_0px_3px_rgba(113,_113,_122,_0.12)]",
      },
      size: {
        default: "h-9 rounded-lg px-3 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
        combobox: 'min-h-[36px] rounded-lg px-3 py-2'
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

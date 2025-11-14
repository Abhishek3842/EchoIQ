import { cn } from "@workspace/ui/lib/utils";

export const WidgetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
    return(
        <header className={cn(
            "bg-[#000000]! text-sidebar-primary-foreground! ",
            className
        )}>
            {children}
        </header>
    )
};

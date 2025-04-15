import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

function HeaderMenuItem({
  icon: Icon,
  label,
  href,
  className,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <NavigationMenuItem className={className}>
      <Link href={href} className="flex gap-2 group/header-menu-item">
        <Icon className="group-hover/header-menu-item:text-primary transition-colors duration-300" />
        <span className="relative">
          <span className="transition-opacity duration-300 group-hover/header-menu-item:opacity-0">
            {label}
          </span>
          <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/header-menu-item:opacity-100 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {label}
          </span>
        </span>
      </Link>
    </NavigationMenuItem>
  );
}

export { HeaderMenuItem };

import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

function HeaderMenuItem({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) {
  return (
    <NavigationMenuItem>
      <Link href={href} className="flex gap-2">
        <Icon className="text-primary" />
        <span>{label}</span>
      </Link>
    </NavigationMenuItem>
  );
}

export { HeaderMenuItem };

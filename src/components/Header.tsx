"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import cn from "classnames";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { ButtonLink } from "@/components/ui";
import { navItems } from "@/config/navigation";
export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="text-muted bg-background/80 backdrop-blur-xl border-b border-border/40 border-gray-200 fixed top-0 left-0 right-0 z-50 h-19 flex items-center">
      <div className="container flex items-center justify-between  px-2  ">
        <Link
          href="/"
          className="text-xl font-bold hover:text-primary font-playfair-display transition-colors py-2"
        >
          Digisuund
        </Link>
        {isMobile && (
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
        <nav
          className={cn(
            isOpen && isMobile
              ? "absolute top-19 left-0 right-0 bg-background  border-b border-border/40 border-gray-200 flex py-4 "
              : "hidden md:block"
          )}
        >
          <ul
            className={cn(
              "flex",
              isMobile && isOpen
                ? "container flex-col mb-2 px-2"
                : "flex items-center gap-10"
            )}
          >
            {navItems.map((item) => (
              <li key={item.label} className="relative py-2 ">
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-primary transition-colors block  text-sm text-description",
                    pathname && isMobile
                      ? pathname === item.href && "text-primary"
                      : pathname === item.href && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
                {pathname === item.href && !isMobile && (
                  <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary"></span>
                )}
              </li>
            ))}
            <li>
              <ButtonLink
                href="/contacts"
                size="default"
                fullWidth={isMobile && isOpen}
                className={cn(isMobile && isOpen && "mt-2")}
              >
                Võta ühendust
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

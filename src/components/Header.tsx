"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useNavIndicator } from "@/hooks/useNavIndicator";
import { ButtonLink } from "@/components/ui";
import { navItems } from "@/config/navigation";

export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { navRef, itemRefs, indicatorStyle } = useNavIndicator(
    pathname,
    navItems,
    isMobile
  );

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <header className="text-muted bg-background/80 backdrop-blur-xl border-b border-border/40 fixed top-0 left-0 right-0 z-50 h-19 flex items-center">
      <div className="container flex items-center justify-between  px-2  ">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity py-2"
        >
          <Image
            src="/images/logo.png"
            alt="Digisuund"
            width={150}
            height={40}
            className="h-14 w-auto"
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>
        {isMobile && (
          <button
            className="md:hidden cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={handleToggle}
          >
            <div className="relative w-6 h-6">
              <X
                className={cn(
                  "absolute inset-0 w-6 h-6 transition-all duration-300 ease-out",
                  isOpen && !isClosing
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-0"
                )}
              />
              <Menu
                className={cn(
                  "absolute inset-0 w-6 h-6 transition-all duration-300 ease-out",
                  isOpen && !isClosing
                    ? "opacity-0 -rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                )}
              />
            </div>
          </button>
        )}
        <nav
          className={cn(
            !isMobile && "hidden md:block",
            isMobile && !isOpen && !isClosing && "hidden",
            isMobile &&
              (isOpen || isClosing) &&
              "absolute top-19 left-0 right-0 bg-background border-b border-border/40 flex py-4 transition-all duration-300 ease-out",
            isMobile &&
              isOpen &&
              !isClosing &&
              "opacity-100 translate-y-0 visible",
            isMobile && isClosing && "opacity-0 -translate-y-4 invisible"
          )}
        >
          <ul
            ref={navRef}
            className={cn(
              "flex relative",
              isMobile && isOpen
                ? "container flex-col mb-2 px-2"
                : "flex items-center gap-10"
            )}
          >
            {!isMobile && indicatorStyle.width > 0 && (
              <span
                className="absolute -bottom-5 h-0.5 bg-primary transition-all duration-500 ease-out will-change-left will-change-width"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            )}
            {navItems.map((item, index) => (
              <li
                key={item.label}
                ref={(el) => {
                  itemRefs.current[item.href] = el;
                }}
                className={cn(
                  "relative py-2",
                  isMobile &&
                    isClosing &&
                    "opacity-0 -translate-y-2 transition-all duration-300 ease-out"
                )}
                style={
                  isMobile && isOpen && !isClosing
                    ? {
                        animation: `fadeInUp 0.4s ease-out ${
                          index * 0.1
                        }s both`,
                      }
                    : undefined
                }
              >
                <Link
                  href={item.href}
                  onClick={() => isMobile && handleClose()}
                  className={cn(
                    "hover:text-primary transition-colors block text-sm text-description",
                    pathname && isMobile
                      ? pathname === item.href && "text-primary"
                      : pathname === item.href && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              style={
                isMobile && isOpen && !isClosing
                  ? {
                      animation: `fadeInUp 0.4s ease-out ${
                        navItems.length * 0.1
                      }s both`,
                    }
                  : undefined
              }
              className={cn(
                isMobile &&
                  isClosing &&
                  "opacity-0 -translate-y-2 transition-all duration-300 ease-out"
              )}
            >
              <ButtonLink
                href="/contacts"
                size="default"
                fullWidth={isMobile && isOpen && !isClosing}
                onClick={() => isMobile && handleClose()}
                className={cn(
                  isMobile && isOpen && !isClosing && "mt-2",
                  "md:whitespace-nowrap"
                )}
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

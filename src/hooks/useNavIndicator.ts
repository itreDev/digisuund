import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface IndicatorStyle {
  left: number;
  width: number;
}

export const useNavIndicator = (
  pathname: string,
  navItems: readonly { href: string }[],
  isMobile: boolean
) => {
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const updateIndicator = () => {
    if (isMobile || !navRef.current) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const normalizedPathname =
      pathname === "/" ? "/" : pathname.replace(/\/$/, "");

    const activeItem = navItems.find((item) => {
      const normalizedHref =
        item.href === "/" ? "/" : item.href.replace(/\/$/, "");
      return normalizedPathname === normalizedHref;
    });

    if (!activeItem) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const activeElement = itemRefs.current[activeItem.href];
    if (!activeElement) {
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = activeElement.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [pathname, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname, isMobile]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      updateIndicator();
      setTimeout(updateIndicator, 100);
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, isMobile]);

  return { navRef, itemRefs, indicatorStyle };
};

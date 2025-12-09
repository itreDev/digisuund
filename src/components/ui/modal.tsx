"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ModalContext = React.createContext<{ onClose?: () => void }>({});

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
  isClosing?: boolean;
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(open);

  React.useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
    } else if (shouldRender) {
      // Start closing animation
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "";
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            isClosing,
            onClose: () => {
              setIsClosing(true);
              setTimeout(() => onOpenChange(false), 300);
            },
          } as any);
        }
        return child;
      })}
    </div>
  );
};

const ModalOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onClose?: () => void;
    isClosing?: boolean;
  }
>(({ className, onClose, isClosing, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isClosing) {
      setIsVisible(false);
    } else {
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [isClosing]);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={onClose}
      {...props}
    />
  );
});
ModalOverlay.displayName = "ModalOverlay";

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, onClose, isClosing, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      if (isClosing) {
        setIsVisible(false);
      } else {
        // Trigger animation after mount
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }
    }, [isClosing]);

    return (
      <ModalContext.Provider value={{ onClose }}>
        <ModalOverlay onClose={onClose} isClosing={isClosing}>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <div
              ref={ref}
              className={cn(
                "bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] sm:max-h-[90vh] overflow-y-auto",
                "transform transition-all duration-300",
                isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-4",
                className
              )}
              onClick={(e) => e.stopPropagation()}
              {...props}
            >
              {children}
            </div>
          </div>
        </ModalOverlay>
      </ModalContext.Provider>
    );
  }
);
ModalContent.displayName = "ModalContent";

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-between p-4 md:p-6 border-b border-border",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-lg md:text-2xl font-bold font-montserrat", className)}
    {...props}
  />
);
ModalTitle.displayName = "ModalTitle";

const ModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { onClose?: () => void }
>(({ className, onClose: onCloseProp, ...props }, ref) => {
  const { onClose: onCloseContext } = React.useContext(ModalContext);
  const onClose = onCloseProp || onCloseContext;

  return (
    <button
      ref={ref}
      onClick={onClose}
      className={cn(
        "text-description hover:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      <X className="w-6 h-6" />
      <span className="sr-only">Sulge</span>
    </button>
  );
});
ModalClose.displayName = "ModalClose";

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex gap-3 p-4 md:p-6 border-t border-border", className)}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalFooter,
};

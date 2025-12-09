"use client";
import { useState, useEffect } from "react";
import { Button, Checkbox } from "@/components/ui";
import { X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import CookieModal from "./CookieModal";

type CookieCategory =
  | "performance"
  | "advertising"
  | "functional"
  | "unclassified";

interface CookiePreferences {
  performance: boolean;
  advertising: boolean;
  functional: boolean;
  unclassified: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    performance: false,
    advertising: false,
    functional: true,
    unclassified: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences({
          ...savedPreferences,
          functional: true,
        });
      } catch (e) {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (showBanner && !showModal) {
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setBannerVisible(true);
      });
    } else {
      setBannerVisible(false);
    }
  }, [showBanner, showModal]);

  const handleAcceptAll = () => {
    const allAccepted = {
      performance: true,
      advertising: true,
      functional: true,
      unclassified: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setBannerVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      setShowModal(false);
    }, 300);
  };

  const handleRejectAll = () => {
    const allRejected = {
      performance: false,
      advertising: false,
      functional: true,
      unclassified: false,
    };
    setPreferences(allRejected);
    localStorage.setItem("cookieConsent", JSON.stringify(allRejected));
    setBannerVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      setShowModal(false);
    }, 300);
  };

  const handleSave = () => {
    const preferencesToSave = {
      ...preferences,
      functional: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferencesToSave));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setBannerVisible(false);
    setTimeout(() => {
      setShowModal(true);
      setShowBanner(false);
    }, 300); // Wait for closing animation
  };

  const handleCloseBanner = () => {
    setBannerVisible(false);
    setTimeout(() => {
      setShowBanner(false);
    }, 300); // Wait for closing animation
  };

  const handleCloseModal = () => {
    setPreferences((prev) => ({
      ...prev,
      functional: true,
    }));
    setShowModal(false);
    // Show banner when modal closes only if user hasn't made a choice
    setTimeout(() => {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        setShowBanner(true);
        // Trigger animation after showing banner
        requestAnimationFrame(() => {
          setBannerVisible(true);
        });
      }
    }, 300); // Wait for modal closing animation
  };

  const toggleCategory = (category: CookieCategory) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handlePreferencesChange = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {showBanner && !showModal && (
        <div
          className={cn(
            "fixed z-50 transform transition-all duration-300 ease-out",
            "bottom-0 left-0 right-0",
            "w-full",
            "min-[376px]:bottom-6 min-[376px]:left-6 min-[376px]:right-auto min-[376px]:w-auto min-[376px]:max-w-md",
            bannerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="bg-white border-t min-[376px]:border border-[hsl(var(--border)/0.6)] shadow-lg p-4 md:p-6 space-y-3 md:space-y-4 relative min-[376px]:rounded-lg">
            <button
              onClick={handleCloseBanner}
              className="text-description hover:text-foreground transition-colors absolute top-4 right-4 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="space-y-3">
              <h3 className="text-lg font-bold font-montserrat">
                See veebisait kasutab küpsiseid
              </h3>
              <p className="text-sm text-description leading-relaxed">
                Kasutame küpsiseid sisu, reklaamide isikupärastamiseks ja
                liikluse analüüsimiseks. Samuti jagame teavet meie saidi
                kasutamise kohta oma reklaami- ja analüüsipartneritega, kes
                võivad seda kombineerida muu teabega, mille olete neile esitanud
                või mille nad on kogunud teie teenuste kasutamisest.{" "}
                <button
                  onClick={handleOpenModal}
                  className="text-primary hover:underline"
                >
                  Rohkem teavet
                </button>
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="banner-performance"
                  checked={preferences.performance}
                  onChange={() => toggleCategory("performance")}
                />
                <label htmlFor="banner-performance" className="cursor-pointer">
                  JÕUDLUSKÜPSISED
                </label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="banner-advertising"
                  checked={preferences.advertising}
                  onChange={() => toggleCategory("advertising")}
                />
                <label htmlFor="banner-advertising" className="cursor-pointer">
                  REKLAAMKÜPSISED
                </label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="banner-functional"
                  checked={preferences.functional}
                  disabled
                />
                <label htmlFor="banner-functional" className="cursor-pointer">
                  FUNKTIONAALSED KÜPSISED
                </label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="banner-unclassified"
                  checked={preferences.unclassified}
                  onChange={() => toggleCategory("unclassified")}
                />
                <label htmlFor="banner-unclassified" className="cursor-pointer">
                  KLASSIFITSEERIMATA KÜPSISED
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAcceptAll}
                scale={false}
                className="w-full sm:flex-1 sm:w-auto h-11 md:h-12"
              >
                NÕUSTU KÕIGIGA
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                scale={false}
                className="w-full sm:flex-1 sm:w-auto h-11 md:h-12"
              >
                KEELDU KÕIGIST
              </Button>
            </div>

            <button
              onClick={handleOpenModal}
              className="flex items-center gap-2 text-sm text-description transition-colors w-full justify-center cursor-pointer group"
            >
              <Settings className="w-4 h-4 transition-colors duration-500 group-hover:text-primary" />
              NÄITA ÜKSIKASJU
            </button>
          </div>
        </div>
      )}

      <CookieModal
        open={showModal}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          } else {
            setShowModal(true);
            setShowBanner(false);
          }
        }}
        preferences={preferences}
        onPreferencesChange={handlePreferencesChange}
        onAcceptAll={handleAcceptAll}
        onRejectAll={handleRejectAll}
        onSave={handleSave}
      />
    </>
  );
}

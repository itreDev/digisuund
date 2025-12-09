"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Toggle } from "@/components/ui";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalFooter,
} from "@/components/ui/modal";
import { cn } from "@/lib/utils";

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

interface CookieModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preferences: CookiePreferences;
  onPreferencesChange: (preferences: CookiePreferences) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: () => void;
}

export default function CookieModal({
  open,
  onOpenChange,
  preferences,
  onPreferencesChange,
  onAcceptAll,
  onRejectAll,
  onSave,
}: CookieModalProps) {
  const [activeTab, setActiveTab] = useState<"statement" | "about">(
    "statement"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayTab, setDisplayTab] = useState<"statement" | "about">(
    "statement"
  );
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab !== displayTab) {
      setIsTransitioning(true);

      // Get current height
      const currentRef = displayTab === "statement" ? statementRef : aboutRef;
      const currentHeight = currentRef.current?.scrollHeight || 0;

      // Temporarily show both to measure new height
      const newContentRef = activeTab === "statement" ? statementRef : aboutRef;
      const tempHeight = newContentRef.current?.scrollHeight || currentHeight;

      // Set current height and switch content
      setContentHeight(currentHeight);
      setDisplayTab(activeTab);

      // Animate to new height
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const finalHeight = newContentRef.current?.scrollHeight || tempHeight;
          setContentHeight(finalHeight);

          // Complete transition
          setTimeout(() => {
            setIsTransitioning(false);
            setContentHeight("auto");
          }, 400);
        });
      });
    }
  }, [activeTab, displayTab]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>See veebisait kasutab küpsiseid</ModalTitle>
          <ModalClose className="cursor-pointer" />
        </ModalHeader>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-description leading-relaxed">
            Kasutame küpsiseid sisu, reklaamide isikupärastamiseks ja liikluse
            analüüsimiseks. Samuti jagame teavet meie saidi kasutamise kohta oma
            reklaami- ja analüüsipartneritega, kes võivad seda kombineerida muu
            teabega, mille olete neile esitanud või mille nad on kogunud teie
            teenuste kasutamisest.{" "}
            <a href="/privat-policy" className="text-primary hover:underline">
              Rohkem teavet
            </a>
          </p>

          <div className="flex gap-2 md:gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("statement")}
              className={cn(
                "pb-3 px-2 text-xs md:text-sm font-medium relative transition-all duration-500 whitespace-nowrap",
                "border-b-2 border-transparent",
                activeTab === "statement"
                  ? "text-primary border-primary"
                  : "text-description hover:text-foreground"
              )}
            >
              KÜPSISTE KASUTAMISE AVALDUS
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={cn(
                "pb-3 px-2 text-xs md:text-sm font-medium relative transition-all duration-300 whitespace-nowrap",
                "border-b-2 border-transparent",
                activeTab === "about"
                  ? "text-primary border-primary"
                  : "text-description hover:text-foreground"
              )}
            >
              KÜPSISTEST
            </button>
          </div>

          <div
            ref={contentRef}
            className="relative overflow-hidden transition-[height] duration-[400ms] ease-in-out"
            style={{
              height:
                typeof contentHeight === "number"
                  ? `${contentHeight}px`
                  : "auto",
            }}
          >
            <div
              ref={statementRef}
              className={cn(
                "space-y-6 transition-opacity duration-[400ms] ease-in-out",
                displayTab !== "statement" &&
                  "opacity-0 pointer-events-none absolute inset-0",
                displayTab === "statement" &&
                  (isTransitioning && activeTab !== "statement"
                    ? "opacity-0"
                    : "opacity-100 relative")
              )}
            >
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-sm md:text-base">
                      JÕUDLUSKÜPSISED
                    </h4>
                    <p className="text-xs md:text-sm text-description leading-relaxed">
                      Jõudlusküpsiseid ehk analüütilisi küpsiseid kasutatakse
                      selleks, et näha, kuidas külastajad veebisaiti kasutavad.
                      Nende küpsistega ei ole võimalik külastajaid otseselt
                      tuvastada.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Toggle
                      checked={preferences.performance}
                      onChange={(checked) =>
                        onPreferencesChange({
                          ...preferences,
                          performance: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-sm md:text-base">
                      REKLAAMKÜPSISED
                    </h4>
                    <p className="text-xs md:text-sm text-description leading-relaxed">
                      Reklaamküpsiseid kasutatakse selleks, et tuvastada,
                      milliselt veebisaidilt külastaja saabus, nt sisupartnerite
                      veebisaitidelt või bännervõrkudest. Neid küpsiseid võivad
                      ettevõtted kasutada külastajate huvide profiili
                      koostamiseks või teistel veebisaitidel asjakohaste
                      reklaamide näitamiseks.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Toggle
                      checked={preferences.advertising}
                      onChange={(checked) =>
                        onPreferencesChange({
                          ...preferences,
                          advertising: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-sm md:text-base">
                      FUNKTIONAALSED KÜPSISED
                    </h4>
                    <p className="text-xs md:text-sm text-description leading-relaxed">
                      Funktsionaalseid küpsiseid kasutatakse veebisaidi
                      külastajaga seotud andmete - näiteks keele, ajavööndi,
                      täiustatud sisu - meelde jätmiseks.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Toggle
                      checked={preferences.functional}
                      onChange={(checked) =>
                        onPreferencesChange({
                          ...preferences,
                          functional: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-sm md:text-base">
                      KLASSIFITSEERIMATA KÜPSISED
                    </h4>
                    <p className="text-xs md:text-sm text-description leading-relaxed">
                      Klassifitseerimata küpsised on küpsised, mis ei kuulu
                      ühtegi teise kategooriasse või mida ei ole veel
                      kategoriseeritud.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Toggle
                      checked={preferences.unclassified}
                      onChange={(checked) =>
                        onPreferencesChange({
                          ...preferences,
                          unclassified: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={aboutRef}
              className={cn(
                "space-y-3 md:space-y-4 text-xs md:text-sm text-description leading-relaxed transition-opacity duration-[400ms] ease-in-out",
                displayTab !== "about" &&
                  "opacity-0 pointer-events-none absolute inset-0",
                displayTab === "about" &&
                  (isTransitioning && activeTab !== "about"
                    ? "opacity-0"
                    : "opacity-100 relative")
              )}
            >
              <p>
                Küpsised on väikesed tekstifailid, mille lisavad teie arvutisse
                teie poolt külastatavad veebisaidid. Veebisaidid kasutavad
                küpsiseid selleks, et aidata kasutajatel saidil paremini
                navigeerida ja teatud funktsioone kasutada. Veebisaidi
                nõuetekohaseks toimimiseks hädavajalikke küpsiseid võidakse teie
                arvutisse lisada ilma teie loata. Kõik muud küpsised tuleb enne
                brauserisse salvestamist heaks kiita.
              </p>
              <p>
                Te saate küpsiste kasutamise nõusolekut igal ajal muuta,
                külastades selleks meie{" "}
                <a
                  href="/privat-policy"
                  className="text-primary hover:underline"
                >
                  privaatsuspoliitika lehte
                </a>
                .
              </p>
              <p>
                Kasutame küpsiseid ka andmete kogumiseks, et isikupärastada ja
                mõõta meie reklaamide tõhusust. Lisateabe saamiseks külastage{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google'i privaatsuspoliitikat
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <ModalFooter className="flex-col sm:flex-row gap-3">
          <Button
            onClick={onAcceptAll}
            variant="outline"
            className="w-full sm:flex-1 sm:w-auto border-border h-11 md:h-12"
          >
            NÕUSTU KÕIGIGA
          </Button>
          <Button
            onClick={onRejectAll}
            variant="outline"
            className="w-full sm:flex-1 sm:w-auto border-border h-11 md:h-12"
          >
            KEELDU KÕIGIST
          </Button>
          <Button
            onClick={onSave}
            className="w-full sm:flex-1 sm:w-auto bg-primary text-white hover:bg-primary/90 h-11 md:h-12"
          >
            SALVESTA JA SULGE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

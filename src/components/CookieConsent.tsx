"use client";
import { useState, useEffect } from "react";
import { Button, Toggle, Checkbox } from "@/components/ui";
import { X, Settings } from "lucide-react";
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

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"statement" | "about">(
    "statement"
  );
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

  const handleAcceptAll = () => {
    const allAccepted = {
      performance: true,
      advertising: true,
      functional: true,
      unclassified: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowModal(false);
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
    setShowBanner(false);
    setShowModal(false);
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

  const handleCloseModal = () => {
    setPreferences((prev) => ({
      ...prev,
      functional: true,
    }));
    setShowModal(false);
  };

  const toggleCategory = (category: CookieCategory) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {showBanner && !showModal && (
        <div className="fixed bottom-6 left-6 z-50 max-w-md animate-in slide-in-from-bottom-5">
          <div className="bg-white rounded-lg border border-[hsl(var(--border)/0.6)] shadow-lg p-6 space-y-4 relative">
            <button
              onClick={() => setShowBanner(false)}
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
                  onClick={() => setShowModal(true)}
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

            <div className="flex gap-3">
              <Button
                onClick={handleAcceptAll}
                className="flex-1 bg-primary text-white hover:bg-primary/90"
              >
                NÕUSTU KÕIGIGA
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="flex-1 border-border"
              >
                KEELDU KÕIGIST
              </Button>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-sm text-description hover:text-foreground transition-colors w-full justify-center"
            >
              <Settings className="w-4 h-4" />
              NÄITA ÜKSIKASJU
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold font-montserrat">
                See veebisait kasutab küpsiseid
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-description hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-description leading-relaxed">
                Kasutame küpsiseid sisu, reklaamide isikupärastamiseks ja
                liikluse analüüsimiseks. Samuti jagame teavet meie saidi
                kasutamise kohta oma reklaami- ja analüüsipartneritega, kes
                võivad seda kombineerida muu teabega, mille olete neile esitanud
                või mille nad on kogunud teie teenuste kasutamisest.{" "}
                <a
                  href="/privat-policy"
                  className="text-primary hover:underline"
                >
                  Rohkem teavet
                </a>
              </p>

              <div className="flex gap-4 border-b border-border">
                <button
                  onClick={() => setActiveTab("statement")}
                  className={cn(
                    "pb-3 px-2 text-sm font-medium transition-colors",
                    activeTab === "statement"
                      ? "text-primary border-b-2 border-primary"
                      : "text-description hover:text-foreground"
                  )}
                >
                  KÜPSISTE KASUTAMISE AVALDUS
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={cn(
                    "pb-3 px-2 text-sm font-medium transition-colors",
                    activeTab === "about"
                      ? "text-primary border-b-2 border-primary"
                      : "text-description hover:text-foreground"
                  )}
                >
                  KÜPSISTEST
                </button>
              </div>

              {activeTab === "statement" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">JÕUDLUSKÜPSISED</h4>
                        <p className="text-sm text-description leading-relaxed">
                          Jõudlusküpsiseid ehk analüütilisi küpsiseid
                          kasutatakse selleks, et näha, kuidas külastajad
                          veebisaiti kasutavad. Nende küpsistega ei ole võimalik
                          külastajaid otseselt tuvastada.
                        </p>
                      </div>
                      <Toggle
                        checked={preferences.performance}
                        onChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            performance: checked,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">REKLAAMKÜPSISED</h4>
                        <p className="text-sm text-description leading-relaxed">
                          Reklaamküpsiseid kasutatakse selleks, et tuvastada,
                          milliselt veebisaidilt külastaja saabus, nt
                          sisupartnerite veebisaitidelt või bännervõrkudest.
                          Neid küpsiseid võivad ettevõtted kasutada külastajate
                          huvide profiili koostamiseks või teistel veebisaitidel
                          asjakohaste reklaamide näitamiseks.
                        </p>
                      </div>
                      <Toggle
                        checked={preferences.advertising}
                        onChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            advertising: checked,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">
                          FUNKTIONAALSED KÜPSISED
                        </h4>
                        <p className="text-sm text-description leading-relaxed">
                          Funktsionaalseid küpsiseid kasutatakse veebisaidi
                          külastajaga seotud andmete - näiteks keele, ajavööndi,
                          täiustatud sisu - meelde jätmiseks.
                        </p>
                      </div>
                      <Toggle
                        checked={preferences.functional}
                        onChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            functional: checked,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">
                          KLASSIFITSEERIMATA KÜPSISED
                        </h4>
                        <p className="text-sm text-description leading-relaxed">
                          Klassifitseerimata küpsised on küpsised, mis ei kuulu
                          ühtegi teise kategooriasse või mida ei ole veel
                          kategoriseeritud.
                        </p>
                      </div>
                      <Toggle
                        checked={preferences.unclassified}
                        onChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            unclassified: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div className="space-y-4 text-description leading-relaxed">
                  <p>
                    Küpsised on väikesed tekstifailid, mille lisavad teie
                    arvutisse teie poolt külastatavad veebisaidid. Veebisaidid
                    kasutavad küpsiseid selleks, et aidata kasutajatel saidil
                    paremini navigeerida ja teatud funktsioone kasutada.
                    Veebisaidi nõuetekohaseks toimimiseks hädavajalikke
                    küpsiseid võidakse teie arvutisse lisada ilma teie loata.
                    Kõik muud küpsised tuleb enne brauserisse salvestamist heaks
                    kiita.
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
                    Kasutame küpsiseid ka andmete kogumiseks, et isikupärastada
                    ja mõõta meie reklaamide tõhusust. Lisateabe saamiseks
                    külastage{" "}
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
              )}
            </div>

            <div className="flex gap-3 p-6 border-t border-border">
              <Button
                onClick={handleAcceptAll}
                variant="outline"
                className="flex-1 border-border"
              >
                NÕUSTU KÕIGIGA
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="flex-1 border-border"
              >
                KEELDU KÕIGIST
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-primary text-white hover:bg-primary/90"
              >
                SALVESTA JA SULGE
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

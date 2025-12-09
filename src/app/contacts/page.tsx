"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, TextArea, Alert, Checkbox } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/validations/contact";

const contactDetails = [
  {
    label: "E-post",
    value: "digisuund@gmail.com",
    icon: Mail,
    href: "mailto:digisuund@gmail.com",
  },
  {
    label: "Telefon",
    value: "+372 536 11983",
    icon: Phone,
    href: "tel:+37253611983",
  },
  {
    label: "Aadress",
    value: "Tartu, Eesti",
    href: "https://www.google.com/maps/place/Tartu,+Eesti",
    icon: MapPin,
  },
];

export default function ContactsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      newsletter: false as boolean,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Viga saatmisel");
      }

      setSubmitStatus("success");
      setShowAlert(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 w-full hero-gradient">
      <div className="container">
        <Alert
          type="success"
          message="Sõnum edukalt saadetud! Võtame peagi ühendust."
          show={submitStatus === "success" && showAlert}
          onClose={() => {
            setShowAlert(false);
            setTimeout(() => setSubmitStatus("idle"), 300);
          }}
        />

        <Alert
          type="error"
          message="Tekkis viga saatmisel. Palun proovi uuesti või võta meiega otse ühendust."
          show={submitStatus === "error" && showAlert}
          onClose={() => {
            setShowAlert(false);
            setTimeout(() => setSubmitStatus("idle"), 300);
          }}
        />

        <div className="text-center mb-24 space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold">
            Võta ühendust
          </h1>
          <p className="text-xl text-description max-w-2xl mx-auto font-light leading-relaxed">
            Broneeri tasuta konsultatsioon või küsi rohkem infot meie teenuste
            kohta
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            {contactDetails.map((contact, index) => (
              <AnimatedCard
                key={contact.label}
                className="p-8"
                delay={index * 100}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0 icon-pulse-container">
                    <contact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 font-montserrat">
                      {contact.label}
                    </h3>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-sm text-description hover:text-foreground transition-colors font-light"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-sm text-description font-light">
                        {contact.value}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <Card className="p-10 lg:col-span-2">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                  >
                    Nimi *
                  </label>
                  <Input
                    id="name"
                    placeholder="Sinu nimi"
                    className="mt-2"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                  >
                    E-post *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nimi@ettevõte.ee"
                    className="mt-2"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                >
                  Telefon *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+372 XXXX XXXX"
                  className="mt-2"
                  {...register("phone")}
                  error={errors.phone?.message}
                  onInput={(e) => {
                    const input = e.currentTarget;
                    input.value = input.value.replace(/[^0-9+\s-]/g, "");
                  }}
                  // pattern="^(\+372|0)?[0-9\s-]{7,12}$"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                >
                  Sinu sõnum *
                </label>
                <TextArea
                  id="message"
                  placeholder="Kirjuta meile oma küsimus või mure..."
                  className="min-h-32 mt-2"
                  {...register("message")}
                  error={errors.message?.message}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="newsletter"
                    {...register("newsletter")}
                    isScope={true}
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm font-light cursor-pointer"
                  >
                    Soovin liituda uudiskirjaga ja saada digiturunduse nõuandeid
                  </label>
                </div>
                {errors.newsletter && (
                  <p className="text-sm text-red-500 ml-6">
                    {errors.newsletter.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="default"
                className="h-12"
                disabled={isSubmitting}
                scale={false}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saadetakse...
                  </>
                ) : (
                  "Saada sõnum"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

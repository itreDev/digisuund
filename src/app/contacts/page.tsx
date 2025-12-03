"use client";
import { useState } from "react";
import { Input, Button, TextArea } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const contactDetails = [
  {
    label: "E-post",
    value: "info@digisuund.ee",
    icon: Mail,
    href: "mailto:info@digisuund.ee",
  },
  {
    label: "Telefon",
    value: "+372 5555 5555",
    icon: Phone,
    href: "tel:+37255555555",
  },
  {
    label: "Aadress",
    value: "Tallinn, Estonia",
    icon: MapPin,
  },
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <section className="pt-32 pb-20 px-4 container mx-auto">
      <div className="text-center mb-24 space-y-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair-display font-bold">
          Võta ühendust
        </h1>
        <p className="text-xl text-description max-w-2xl mx-auto font-light leading-relaxed">
          Broneeri tasuta konsultatsioon või küsi rohkem infot meie teenuste
          kohta
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
        <div className="space-y-6">
          {contactDetails.map((contact) => (
            <Card key={contact.label} className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
                  <contact.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-2 font-playfair-display">
                    {contact.label}
                  </h3>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="text-sm text-description hover:text-foreground transition-colors font-light"
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
            </Card>
          ))}
        </div>
        <Card className="p-10 lg:col-span-2">
          <form className="space-y-8 " onSubmit={handleSubmit}>
            <div className="space-y-2 grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
                >
                  Nimi *
                </label>
                <Input
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Sinu nimi"
                  className="mt-2"
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
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nimi@ettevõte.ee"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
              >
                Telefon
              </label>
              <Input
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+372 XXXX XXXX"
                className="mt-2"
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
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Kirjuta meile oma küsimus või mure..."
                className="min-h-32 mt-2"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="newsletter"
                className="rounded border-border"
              />
              <label
                htmlFor="newsletter"
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-light cursor-pointer"
              >
                Soovin liituda uudiskirjaga ja saada digiturunduse nõuandeid
              </label>
            </div>
            <Button type="submit" size="default" className="h-12">
              Saada sõnum
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

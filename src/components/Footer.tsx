import Link from "next/link";
import { navItems } from "@/config/navigation";
import { Instagram, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/mairit-laine",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/digisuund/",
    icon: Instagram,
  },
  {
    label: "mail",
    href: "mailto:digisuund@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className=" border-t border-border/40">
      <div className="container px-2 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-montserrat font-bold text-muted">
              Digisuund
            </h3>
            <p className="text-sm text-description font-light">
              Professionaalne digiturunduse konsultatsioon Eesti ettevõtetele
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold mb-6 text-sm font-montserrat">
              Menüü
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-description font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-sm font-montserrat">
              Õiguslik
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privat-policy"
                  className="text-sm text-description font-light"
                >
                  Privaatsuspoliitika
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts" // TODO: Add terms of service link
                  className="text-sm text-description font-light"
                >
                  Kasutustingimused
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-sm font-montserrat">
              Kontakt
            </h4>
            <ul className="space-y-3 flex  gap-3">
              {socialLinks.map((item) => (
                <li
                  key={item.label}
                  className="group w-10 h-10 rounded-full border border-description/60 flex items-center justify-center text-description/50 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer icon-pulse-container"
                >
                  <Link
                    href={item.href}
                    className="text-sm text-description font-light flex items-center justify-center gap-2"
                  >
                    {item.icon === Linkedin && (
                      <Linkedin className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                    )}
                    {item.icon === Instagram && (
                      <Instagram className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                    )}
                    {item.icon === Mail && (
                      <Mail className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-description font-light">
            © {new Date().getFullYear()} Digisuund OÜ. Kõik õigused kaitstud.
          </p>
        </div>
      </div>
    </footer>
  );
}

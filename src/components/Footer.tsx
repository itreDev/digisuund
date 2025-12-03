import Link from "next/link";
import { navItems } from "@/config/navigation";
import { Instagram, Linkedin, Mail } from "lucide-react";

// TODO: Add social links and mail to config
const socialLinks = [
  {
    label: "Linkedin",
    href: "#",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    label: "mail",
    href: "#",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className=" border-t border-gray-200">
      <div className="container px-2 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-playfair-display font-bold text-muted">
              Digisuund
            </h3>
            <p className="text-sm text-description font-light">
              Professionaalne digiturunduse konsultatsioon Eesti ettevõtetele
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium mb-6 text-sm font-playfair-display">
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
            <h4 className="font-medium mb-6 text-sm font-playfair-display">
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
            <h4 className="font-medium mb-6 text-sm font-playfair-display">
              Kontakt
            </h4>
            <ul className="space-y-3 flex  gap-3">
              {socialLinks.map((item) => (
                <li
                  key={item.label}
                  className="w-10 h-10 rounded-full border border-description/60  flex items-center justify-center text-description/50 hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <Link
                    href={item.href}
                    className="text-sm text-description font-light flex items-center justify-center gap-2"
                  >
                    {item.icon === Linkedin && <Linkedin className="w-4 h-4" />}
                    {item.icon === Instagram && (
                      <Instagram className="w-4 h-4" />
                    )}
                    {item.icon === Mail && <Mail className="w-4 h-4" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-description font-light">
            © {new Date().getFullYear()} Digisuund OÜ. Kõik õigused kaitstud.
          </p>
        </div>
      </div>
    </footer>
  );
}

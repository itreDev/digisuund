import { ButtonLink, Card } from "@/components/ui";
import {
  Target,
  Search,
  Users,
  Megaphone,
  Mail,
  BarChart3,
  Zap,
  TrendingUp,
  CircleCheck,
} from "lucide-react";

export default function TeenusedPage() {
  const services = [
    {
      title: "Digiturunduse strateegia",
      description:
        "Loome Sinu ettevõttele tervikliku digiturunduse strateegia, mis arvestab Sinu eesmärke ja sihtrühma.",
      icon: Target,
      features: [
        "Turu-uuring ja konkurentide analüüs",
        "Sihtrühma määratlemine",
        "Kanalite strateegia",
        "Tegevuskava ja ajakava",
      ],
    },
    {
      title: "SEO optimeerimine",
      description:
        "Parandame Sinu veebilehe nähtavust otsingumootorties ja toome kvaliteetseid külastajaid.",
      icon: Search,
      features: [
        "Tehnilise SEO audit",
        "Märksõnade uurimine",
        "Sisu optimeerimine",
        "Linkehituse strateegia",
      ],
    },
    {
      title: "Sotsiaalmeedia turundus",
      description:
        "Kasvatame Sinu kogukonda ja loome sisukat suhtlust Sinu sihtrühmaga.",
      icon: Users,
      features: [
        "Sisustrateegia loomine",
        "Postituste planeerimine",
        "Kogukonna haldamine",
        "Sotsiaalmeedia reklaamid",
      ],
    },
    {
      title: "Google Ads kampaaniad",
      description:
        "Jõuame Sinu potentsiaalsete klientideni siis, kui nad otsivad just Sinu teenuseid.",
      icon: Megaphone,
      features: [
        "Kampaaniate loomine",
        "Märksõnade strateegia",
        "Eelarvete optimeerimine",
        "A/B testimine",
      ],
    },
    {
      title: "E-posti turundus",
      description:
        "Ehitame püsivaid kliendisuhteid läbi personaalsete e-kirjade ja uudiskirjade.",
      icon: Mail,
      features: [
        "E-kirjade kujundus",
        "Automatiseeritud kampaaaniad",
        "Segmenteerimine",
        "Tulemuste analüüs",
      ],
    },
    {
      title: "Analüütika ja aruandlus",
      description:
        "Jälgime Sinu tulemusi ja anname regulaarselt ülevaadet tehtud tööst.",
      icon: BarChart3,
      features: [
        "Google Analytics seadistamine",
        "Kuumääruste jälgimine",
        "Regulaarsed aruanded",
        "Soovitused parendamiseks",
      ],
    },
    {
      title: "Konversioonide optimeerimine",
      description:
        "Muudame külastajad klientideks läbi testimise ja optimeerimise.",
      icon: Zap,
      features: [
        "Kasutajakogemuse analüüs",
        "A/B testimine",
        "Lehtede optimeerimine",
        "Vormide optimeerimine",
      ],
    },
    {
      title: "Konsultatsioonid ja koolitus",
      description:
        "Aitame Sinu meeskonnal õppida digiturunduse põhitõdesid ja parimaid praktikaid.",
      icon: TrendingUp,
      features: [
        "Individuaalsed konsultatsioonid",
        "Meeskonna koolitused",
        "Töötoad",
        "Pidev tugi",
      ],
    },
  ];
  return (
    <section className="pt-32 pb-20 px-2 container">
      <div className=" max-w-6xl">
        <div className="text-center mb-24 space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair-display font-bold">
            Teenused
          </h1>
          <p className="text-xl text-description max-w-2xl mx-auto font-light leading-relaxed">
            Terviklikud digiturunduse lahendused, mis aitavad Sinu ettevõttel
            kasvada
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {services.map((service) => (
            <Card key={service.title} className="p-10">
              <div className="mb-6">
                <div className="inline-flex p-3 rounded-2xl bg-primary-light group-hover:bg-primary/10 transition-colors duration-500">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-playfair-display font-semibold mb-4">
                {service.title}
              </h3>
              <p className="text-description leading-relaxed font-light mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-sm text-description flex items-start"
                  >
                    <span className="text-primary mr-2">
                      <CircleCheck className="h-4 w-4" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="text-center space-y-6 pt-8">
          <h2 className="text-3xl md:text-4xl font-playfair-display font-bold">
            Huvitatud?
          </h2>
          <p className="text-lg text-description max-w-xl mx-auto font-light">
            Broneeri tasuta konsultatsioon ja arutame, kuidas saame Sind aidata
          </p>
          <div className="pt-4">
            <ButtonLink size="large" className="inline-flex" href="/contacts">
              Võta ühendust
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

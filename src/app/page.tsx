"use client";
import { ButtonLink } from "@/components/ui";
import { AnimatedCard } from "@/components/AnimatedCard";
import { ArrowRight, Users, TrendingUp, Zap, Target } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Strateegiline planeerimine",
    description:
      "Loome Sinu ettevõttele personaalse digiturunduse strateegia, mis toob tulemusi.",
    icon: Target,
  },
  {
    title: "SEO optimeerimine",
    description:
      "Parandame Sinu nähtavust otsingumootorties ja toome kvaliteetseid külastajaid.",
    icon: TrendingUp,
  },
  {
    title: "Sotsiaalmeedia",
    description:
      "Kasvatame Sinu kogukonda ja loome sisukat suhtlust Sinu sihtrühmaga.",
    icon: Users,
  },
  {
    title: "Konversioonide optimeerimine",
    description:
      "Muudame külastajad klientideks läbi testimise ja optimeerimise.",
    icon: Zap,
  },
];
export default function HomePage() {
  return (
    <>
      <section className="pt-40 pb-32 px-4 ">
        <div className="container max-w-5xl">
          <div className="text-center space-y-6 md:space-y-8">
            <h1
              className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-montserrat font-bold leading-[1.1] tracking-tight px-2"
              style={{
                textShadow:
                  "0 4px 12px rgba(90, 62, 91, 0.2), 0 2px 6px rgba(90, 62, 91, 0.15)",
              }}
            >
              Kasvata oma ettevõtet
              <span className="block text-primary mt-2 sm:mt-3">
                digiturunduse abil
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-description max-w-2xl mx-auto font-light leading-relaxed px-4">
              Professionaalne digiturunduse konsultatsioon Eesti ettevõtetele
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 md:pt-8 px-4">
              <ButtonLink
                href="/service"
                size="large"
                className="w-full sm:w-auto"
              >
                Broneeri konsultatsioon
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="outline"
                size="large"
                className="w-full sm:w-auto"
              >
                Vaata teenuseid <ArrowRight className="w-4 h-4 ml-2" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-4 w-full hero-gradient">
        <div className="container w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
              Kuidas me aitame?
            </h2>
            <p className="text-lg md:text-xl text-description max-w-2xl mx-auto font-light">
              Terviklikud digiturunduse lahendused, mis toovad tulemusi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            {services.map((service, index) => (
              <AnimatedCard
                key={service.title}
                className="p-10 equal-height w-full"
                delay={index * 100}
              >
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-primary-light group-hover:bg-primary/10 transition-colors duration-500 icon-pulse-container">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-description leading-relaxed font-light">
                  {service.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
          <div className="text-center mt-16">
            <ButtonLink
              href="/services"
              size="large"
              variant="outline"
              className="border-none inline-flex group hover:bg-accent hover:text-white hover:scale-105"
            >
              Vaata kõiki teenuseid
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="py-32 px-4 w-full">
        <div className="container w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
              Miks just meie?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            <AnimatedCard
              className="p-10 text-center equal-height w-full"
              delay={0}
            >
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light group-hover:bg-primary/10 transition-colors duration-500 icon-pulse-container">
                  <Image
                    src="/images/media-experience.png"
                    alt="Meediakogemus"
                    width={32}
                    height={32}
                    className="w-9 h-9 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-montserrat font-semibold mb-4">
                Meediakogemus
              </h3>
              <p className="text-description leading-relaxed font-light">
                Praktikas tõestatud strateegiad, mis toovad päris tulemusi.
              </p>
            </AnimatedCard>
            <AnimatedCard
              className="p-10 text-center equal-height w-full"
              delay={100}
            >
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light group-hover:bg-primary/10 transition-colors duration-500 icon-pulse-container">
                  <Image
                    src="/images/transparent-pricing.png"
                    alt="Läbipaistev hind"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-montserrat font-semibold mb-4">
                Läbipaistev hind
              </h3>
              <p className="text-description leading-relaxed font-light">
                Selge hinnastus ilma peidetud kulude ja üllatusteta.
              </p>
            </AnimatedCard>
            <AnimatedCard
              className="p-10 text-center equal-height w-full"
              delay={200}
            >
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light group-hover:bg-primary/10 transition-colors duration-500 icon-pulse-container">
                  <Image
                    src="/images/partnership.png"
                    alt="Partnerlus"
                    width={32}
                    height={32}
                    className="w-11 h-11 object-contain max-w-full max-h-full"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-montserrat font-semibold mb-4">
                Partnerlus
              </h3>
              <p className="text-description leading-relaxed font-light">
                Koos töötame nagu üks tiim – sinu eesmärgid on ka meie omad.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>
      <section className="py-32 px-4 hero-gradient">
        <div className="container max-w-3xl">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold">
              Valmis alustama?
            </h2>
            <p className="text-xl text-description max-w-xl mx-auto font-light leading-relaxed">
              Broneeri tasuta konsultatsioon ja arutame, kuidas digiturundus
              aitab Sinu ettevõtet.
            </p>
            <div className="pt-4">
              <ButtonLink size="large" className="inline-flex" href="/contacts">
                Võta ühendust
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

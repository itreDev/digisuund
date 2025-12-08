import { ButtonLink, Card } from "@/components/ui";
import { ArrowRight, Users, TrendingUp, Zap, Target } from "lucide-react";

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
      <section className="pt-40 pb-32 px-4">
        <div className="container max-w-5xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-bold leading-[1.1] tracking-tight">
              Kasvata oma ettevõtet
              <span className="block text-primary mt-3">
                digiturunduse abil
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-description max-w-2xl mx-auto font-light leading-relaxed">
              Professionaalne digiturunduse konsultatsioon Eesti ettevõtetele
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <ButtonLink href="/service" size="large">
                Broneeri konsultatsioon
              </ButtonLink>
              <ButtonLink href="/service" variant="outline" size="large">
                Vaata teenuseid <ArrowRight className="w-4 h-4 ml-2" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-4 w-full section-bg-subtle">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
              Kuidas me aitame?
            </h2>
            <p className="text-lg md:text-xl text-description max-w-2xl mx-auto font-light">
              Terviklikud digiturunduse lahendused, mis toovad tulemusi
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 ">
            {services.map((service) => (
              <Card key={service.title} className="p-10">
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-2xl bg-primary-light group-hover:bg-primary/10 transition-colors duration-500 ">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-description leading-relaxed font-light">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <ButtonLink
              href="/services"
              size="large"
              variant="outline"
              className="border-none !inline-flex group !w-fit !min-w-0 hover:!bg-accent hover:!text-white transition-all duration-500"
            >
              Vaata kõiki teenuseid
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="py-32 px-4">
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

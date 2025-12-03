import Image from "next/image";
import { Card, Chip } from "@/components/ui";
import { Calendar } from "lucide-react";

const formatEstonianDate = (date: Date): string => {
  return new Intl.DateTimeFormat("et-EE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function BlogPage() {
  const posts = [
    {
      title: "Kuidas alustada digiturundusega väikeettevõttena?",
      description:
        "Tutvume põhiliste sammudega, mida väikeettevõte saab teha oma digiturunduse alustamiseks...",
      date: new Date(2024, 8, 15),
      type: "Strateegia",
      image: "/placeholder.svg",
    },
    {
      title: "SEO põhitõed 2024. aastal",
      description:
        "Vaatame üle kõige olulisemad SEO trendid ja praktikad, mis aitavad Sind 2024. aastal...",
      date: new Date(2024, 0, 12),
      type: "SEO",
      image: "/placeholder.svg",
    },
    {
      title: "Sotsiaalmeedia sisu loomine: juhend algajatele",
      description:
        "Jagame praktilisi nõuandeid, kuidas luua kaasahaaravat sisu erinevatele sotsiaalmeedia kanalitele...",
      date: new Date(2024, 11, 1),
      type: "Sotsiaalmeedia",
      image: "/placeholder.svg",
    },
  ];
  return (
    <section className="pt-32 pb-20 px-4 container">
      <div className="max-w-6xl">
        <div className="text-center mb-24 space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair-display font-bold">
            Blogi
          </h1>
          <p className="text-xl text-description max-w-2xl mx-auto font-light leading-relaxed">
            Praktilised nõuanded ja teadmised digiturunduse maailmast
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post) => (
          <Card key={post.title}>
            <div className="aspect-[4/3] bg-description overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Chip>{post.type}</Chip>
                <div className="flex items-center gap-1.5 text-xs text-description font-light">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatEstonianDate(post.date)}</span>
                </div>
              </div>
              <h3 className="text-xl font-playfair-display font-semibold line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-description line-clamp-3 font-light leading-relaxed">
                {post.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-24 text-center">
        <p className="text-lg text-description font-light">
          Rohkem artikleid tuleb peagi
        </p>
      </div>
    </section>
  );
}

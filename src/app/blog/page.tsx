"use client";
import Image from "next/image";
import { Chip } from "@/components/ui";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Calendar } from "lucide-react";
import { posts } from "./posts";

const formatEstonianDate = (date: Date): string => {
  return new Intl.DateTimeFormat("et-EE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function BlogPage() {
  return (
    <section className="pt-32 pb-20 px-4 w-full hero-gradient">
      <div className="container">
        <div className="text-center mb-24 space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold">
            Blogi
          </h1>
          <p className="text-xl text-description max-w-2xl mx-auto font-light leading-relaxed">
            Praktilised nõuanded ja teadmised digiturunduse maailmast
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => {
            const paragraphs = post.description
              .split("<br />")
              .map((p) => p.trim())
              .filter(Boolean);

            return (
              <AnimatedCard
                key={post.title}
                delay={index * 100}
                className="equal-height"
              >
                <div className="aspect-[4/3] bg-description relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
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
                  <h3 className="text-xl font-montserrat font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <div className="text-description font-light leading-relaxed space-y-3">
                    {paragraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
        <div className="mt-24 text-center">
          <p className="text-lg text-description font-light">
            Rohkem artikleid tuleb peagi
          </p>
        </div>
      </div>
    </section>
  );
}

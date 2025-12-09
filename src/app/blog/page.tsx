"use client";
import Image from "next/image";
import Link from "next/link";
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

            // Get preview text (first paragraph or first 150 characters)
            const previewText =
              paragraphs[0] || post.description.substring(0, 150);
            const truncatedPreview =
              previewText.length > 150
                ? previewText.substring(0, 150) + "..."
                : previewText;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block h-full"
              >
                <AnimatedCard
                  delay={index * 100}
                  className="equal-height h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-description/20 rounded-t-lg relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Chip>{post.type}</Chip>
                      <div className="flex items-center gap-1.5 text-xs text-description font-light">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatEstonianDate(post.date)}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-montserrat font-semibold leading-snug text-foreground">
                      {post.title}
                    </h3>
                    <div className="text-description font-light leading-relaxed space-y-3 flex-1">
                      <p>{truncatedPreview}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
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

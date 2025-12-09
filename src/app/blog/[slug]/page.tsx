import { notFound } from "next/navigation";
import Image from "next/image";
import { posts } from "../posts";
import { ButtonLink, Chip } from "@/components/ui";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const formatEstonianDate = (date: Date): string => {
  return new Intl.DateTimeFormat("et-EE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.description
    .split("<br />")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="pt-32 pb-20 px-4 w-full hero-gradient">
      <div className="container max-w-4xl">
        <ButtonLink
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 h-11 group"
          size="large"
          variant="outline"
          scale={false}
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:mr-3 transition-all duration-300" />
          <span className="text-sm font-light">Tagasi blogisse</span>
        </ButtonLink>

        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Chip>{post.type}</Chip>
              <div className="flex items-center gap-1.5 text-sm text-description font-light">
                <Calendar className="w-4 h-4" />
                <span>{formatEstonianDate(post.date)}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="aspect-video bg-description relative rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-description font-light leading-relaxed space-y-4 text-base md:text-lg">
              {paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from "@/data/blogData";
import CodeBlock from "@/components/CodeBlock";
import MarkdownRenderer, { InlineMarkdown } from "@/components/MarkdownRenderer";
import {
  ChevronLeft,
  Clock,
  Calendar,
  Share2,
  BookOpen,
  Sparkles,
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Bookmark,
  Check,
} from "lucide-react";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Makale Bulunamadı | learn.tncy.dev",
    };
  }

  return {
    title: `${post.title} | learn.tncy.dev Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Benzer yazılar (aynı kategori veya rastgele diğer yazılar)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // SEO için JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    keywords: post.tags.join(", "),
    publisher: {
      "@type": "Organization",
      name: "learn.tncy.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://learn.tncy.dev/logo.png",
      },
    },
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ekmek Kırıntısı (Breadcrumbs) */}
      <div className="text-xs breadcrumbs text-base-content/60 mb-6">
        <ul>
          <li>
            <Link href="/" className="hover:text-primary">
              Ana Sayfa
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
          </li>
          <li className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
            {post.title}
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SOL VE ORTA: ANA MAKALE İÇERİĞİ (8 Kolon) */}
        <article className="lg:col-span-8 space-y-8 min-w-0">
          {/* Makale Başlık Başlığı */}
          <header className="border-b border-base-300 pb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ${post.categoryColor} badge-sm font-mono font-bold`}>
                {post.category}
              </span>
              <span className="badge badge-ghost badge-sm text-[11px] font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
              <span className="badge badge-ghost badge-sm text-[11px] font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {post.publishedAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-base-content leading-tight">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed font-medium">
              {post.subtitle}
            </p>

            {/* Yazar Bilgi Kutusu */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-sm text-primary font-mono shrink-0">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-base-content">
                    {post.author.name}
                  </div>
                  <div className="text-[11px] text-base-content/50">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Etiketler */}
              <div className="hidden sm:flex flex-wrap items-center gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-base-200 text-base-content/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Makale Bölümleri */}
          <div className="space-y-10 text-sm sm:text-base leading-relaxed text-base-content/90">
            {post.sections.map((section, idx) => (
              <section key={section.id || idx} id={section.id} className="space-y-4 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content tracking-tight border-b border-base-content/5 pb-2">
                  {section.title}
                </h2>

                <MarkdownRenderer content={section.content} />

                {/* Uyarı & İpucu Kutusu */}
                {section.callout && (
                  <div
                    className={`alert shadow-xs my-4 border ${
                      section.callout.type === "info"
                        ? "alert-info bg-sky-500/10 border-sky-500/30 text-sky-950 dark:text-sky-100"
                        : section.callout.type === "warning"
                        ? "alert-warning bg-warning/10 border-warning/30 text-base-content"
                        : section.callout.type === "success"
                        ? "alert-success bg-success/10 border-success/30 text-base-content"
                        : "alert-neutral bg-base-200 border-base-content/20 text-base-content"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {section.callout.type === "info" ? (
                        <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                      ) : section.callout.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      ) : section.callout.type === "success" ? (
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      ) : (
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
                          <InlineMarkdown text={section.callout.title} />
                        </h4>
                        <p className="text-xs leading-relaxed">
                          <InlineMarkdown text={section.callout.message} />
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Kod Bloğu */}
                {section.code && (
                  <div className="my-4">
                    <CodeBlock
                      code={section.code.code}
                      language={section.code.language}
                      caption={section.code.caption}
                    />
                  </div>
                )}

                {/* Karşılaştırma Tablosu */}
                {section.table && (
                  <div className="overflow-x-auto rounded-xl border border-base-300 my-4 shadow-xs">
                    <table className="table table-sm w-full font-mono text-xs">
                      <thead className="bg-base-200/80">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="text-base-content/80 font-bold">
                              <InlineMarkdown text={h} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-base-200/40">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={cIdx === 0 ? "font-bold text-base-content" : "text-base-content/80"}
                              >
                                <InlineMarkdown text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Öne Çıkan Notlar (Key Takeaways) */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-base-200/50 to-secondary/10 border border-primary/20 space-y-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-base-content">
                  Öne Çıkan Ana Fikirler (Key Takeaways)
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-base-content/80 font-medium">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span><InlineMarkdown text={item} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alt Gezinme & Geri Dönüş */}
          <div className="pt-6 border-t border-base-300 flex items-center justify-between">
            <Link
              href="/blog"
              className="btn btn-outline btn-sm gap-2 font-mono text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              Tüm Blog Yazılarına Dön
            </Link>

            <Link
              href="/courses"
              className="btn btn-primary btn-sm gap-2 font-mono text-xs shadow-sm"
            >
              Kursları Keşfet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* SAĞ SÜTUN: İÇİNDEKİLER & YAN PANEL (4 Kolon, Sticky) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* İçindekiler (Table of Contents) */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase font-mono tracking-wider text-base-content/70 pb-2 border-b border-base-content/10">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>İçindekiler</span>
            </div>

            <nav className="space-y-1 text-xs">
              {post.sections.map((section, idx) => (
                <a
                  key={section.id || idx}
                  href={`#${section.id}`}
                  className="block py-1.5 px-2 rounded-lg text-base-content/70 hover:text-primary hover:bg-base-200 transition-colors line-clamp-1"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          {/* İlgili / Diğer Makaleler */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-xs space-y-3">
            <div className="text-xs font-bold uppercase font-mono tracking-wider text-base-content/70 pb-2 border-b border-base-content/10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-warning" />
              <span>Diğer Teknik Makaleler</span>
            </div>

            <div className="space-y-3">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="block p-2.5 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${rel.categoryColor} badge-xs font-mono`}>
                      {rel.category}
                    </span>
                    <span className="text-[10px] font-mono text-base-content/50">
                      {rel.readTime}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

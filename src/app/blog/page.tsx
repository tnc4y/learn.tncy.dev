"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BlogPost } from "@/data/blogData";
import {
  BookOpen,
  Search,
  Clock,
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Zap,
  Calendar,
  User,
  Tag,
  Flame,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tüm Yazılar" },
  { id: "İşlemci & Mimari", label: "İşlemci & Mimari" },
  { id: "Donanım Tasarımı", label: "Donanım Tasarımı" },
  { id: "FPGA & EDA Araçları", label: "FPGA & EDA Araçları" },
  { id: "Savunma & Kritik Sistemler", label: "Savunma & Kritik Sistemler" },
  { id: "Yarı İletken & Çip", label: "Yarı İletken & Çip" },
];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. ÜST HERO BAŞLIK ALANI */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-base-200/90 via-base-100 to-base-200/50 border border-base-300 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teknik Derinlik • Mühendislik Blogu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content leading-tight">
              Donanım & Yazılım <span className="text-primary">Mühendisliği</span> Blogu
            </h1>

            <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
              İşlemci mikromimarilerinden SystemVerilog RTL tasarımına, AMD Vivado EDA araçlarından
              savunma sanayiinde VHDL standartlarına ve silikon fabrikasyonuna kadar derinlemesine teknik makaleler.
            </p>
          </div>

          {/* İstatistik Kutusu */}
          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0 bg-base-100/80 p-4 rounded-2xl border border-base-300 shadow-xs">
            <div className="text-center px-2">
              <div className="text-2xl font-black font-mono text-primary">
                {BLOG_POSTS.length}
              </div>
              <div className="text-[11px] text-base-content/60 font-medium">Makale</div>
            </div>
            <div className="text-center px-2 border-x border-base-300">
              <div className="text-2xl font-black font-mono text-secondary">
                65+
              </div>
              <div className="text-[11px] text-base-content/60 font-medium">Dk Okuma</div>
            </div>
            <div className="text-center px-2">
              <div className="text-2xl font-black font-mono text-accent">
                %100
              </div>
              <div className="text-[11px] text-base-content/60 font-medium">Açık Kaynak</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ÖNE ÇIKAN MAKALE (FEATURED) */}
      {selectedCategory === "all" && !searchQuery && featuredPost && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase font-mono tracking-wider text-primary">
            <Flame className="w-4 h-4 text-warning animate-pulse" />
            <span>Öne Çıkan Başyazı</span>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-base-100 to-base-200/40 p-6 sm:p-8 shadow-md hover:border-primary/40 transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`badge ${featuredPost.categoryColor} badge-sm font-mono font-bold`}>
                    {featuredPost.category}
                  </span>
                  <span className="badge badge-ghost badge-sm text-[11px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featuredPost.readTime} okuma
                  </span>
                  <span className="badge badge-ghost badge-sm text-[11px] font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {featuredPost.publishedAt}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-base-content group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-base-200 border border-base-content/10 text-base-content/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex items-center lg:flex-col justify-between gap-4 pt-2 lg:pt-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary font-mono">
                    T
                  </div>
                  <div>
                    <div className="text-xs font-bold">{featuredPost.author.name}</div>
                    <div className="text-[10px] text-base-content/50">{featuredPost.author.role}</div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="btn btn-primary btn-sm gap-2 font-mono text-xs shadow-sm"
                >
                  Makaleyi Oku
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. ARAMA VE KATEGORİ FİLTRELEME */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-base-300">
        {/* Kategori Butonları */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn btn-xs sm:btn-sm font-mono text-xs shrink-0 rounded-lg ${
                selectedCategory === cat.id
                  ? "btn-primary shadow-xs font-bold"
                  : "btn-ghost border border-base-content/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Arama Girişi */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-base-content/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Makale veya etiket ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-sm w-full pl-9 bg-base-200/60 border-base-300 font-mono text-xs rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* 4. MAKALE KARTLARI IZGARASI */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-lg transition-all p-5 group"
            >
              <div className="space-y-3">
                {/* Kategori & Süre */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`badge ${post.categoryColor} badge-xs font-mono font-bold`}>
                    {post.category}
                  </span>
                  <span className="text-[11px] font-mono text-base-content/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                {/* Başlık */}
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-base sm:text-lg font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                {/* Özet */}
                <p className="text-xs text-base-content/70 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Etiketler */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-base-200 text-base-content/60"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-[9px] font-mono text-base-content/40">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Alt Bilgi & Oku Linki */}
              <div className="pt-4 mt-4 border-t border-base-content/5 flex items-center justify-between">
                <div className="text-[11px] font-mono text-base-content/50">
                  {post.publishedAt}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="btn btn-ghost btn-xs gap-1 font-mono text-primary text-xs group-hover:translate-x-1 transition-transform"
                >
                  Devamını Oku →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-dashed border-base-300 space-y-3">
          <BookOpen className="w-8 h-8 mx-auto text-base-content/30" />
          <h3 className="text-sm font-bold">Aramanıza uygun makale bulunamadı</h3>
          <p className="text-xs text-base-content/60 max-w-sm mx-auto">
            Farklı bir arama terimi deneyebilir veya kategoriyi &quot;Tüm Yazılar&quot; olarak değiştirebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="btn btn-outline btn-xs font-mono"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
}

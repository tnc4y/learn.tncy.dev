import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PROJECT_RECIPES, ProjectRecipe } from "@/data/projectsData";
import CodeBlock from "@/components/CodeBlock";
import {
  Clock,
  Layers,
  Terminal,
  ExternalLink,
  Code2,
  Hammer,
  Radio,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Cpu,
  Bot,
  Wifi,
  Sparkles,
  CheckCircle2,
  Share2,
  Bookmark,
  ShieldAlert,
  Info,
  Wrench,
  CircuitBoard,
} from "lucide-react";

export function generateStaticParams() {
  return PROJECT_RECIPES.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECT_RECIPES.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Proje Bulunamadı | learn.tncy.dev",
    };
  }

  return {
    title: `${project.title} - Yapım & Donanım Rehberi | learn.tncy.dev`,
    description: project.summary,
    keywords: [...project.tags, project.category, "robotik", "gömülü sistemler", "donanım"],
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.image],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECT_RECIPES.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Benzer veya diğer projeler
  const relatedProjects = PROJECT_RECIPES.filter((p) => p.id !== project.id)
    .sort((a, b) => (a.category === project.category ? -1 : 1))
    .slice(0, 3);

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.summary,
    image: project.image,
    category: project.category,
    dependencies: project.hardwareBOM.map((b) => b.item).join(", "),
    proficiencyLevel: project.difficulty,
  };

  const getWiringBadgeClass = (type: string) => {
    switch (type) {
      case "Power":
        return "badge-error text-error-content";
      case "GND":
        return "badge-neutral text-white";
      case "I2C":
        return "badge-success text-success-content";
      case "SPI":
        return "badge-accent text-accent-content";
      case "UART":
        return "badge-info text-info-content";
      case "CAN":
        return "badge-warning text-warning-content";
      case "Digital":
        return "badge-primary text-primary-content";
      case "Analog":
        return "badge-secondary text-secondary-content";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-32">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. ÜST NAVİGASYON & BREADCRUMBS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div className="text-xs breadcrumbs text-base-content/60">
          <ul>
            <li>
              <Link href="/" className="hover:text-primary">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-primary">
                Proje Atölyesi
              </Link>
            </li>
            <li>
              <span className="badge badge-sm badge-ghost font-mono text-[11px]">
                {project.category}
              </span>
            </li>
            <li className="text-primary font-bold truncate max-w-xs sm:max-w-md">
              {project.title}
            </li>
          </ul>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-base-content/70 hover:text-primary transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tüm Projelere Dön</span>
        </Link>
      </div>

      {/* 2. BLOG-STYLE HERO HEADER */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-primary font-mono text-xs font-bold px-3 py-2.5">
            {project.category}
          </span>
          <span
            className={`badge font-mono text-xs font-bold px-3 py-2.5 ${
              project.difficulty === "Başlangıç"
                ? "badge-success text-success-content"
                : project.difficulty === "Orta"
                ? "badge-warning text-warning-content"
                : "badge-error text-error-content"
            }`}
          >
            {project.difficulty}
          </span>
          <span className="badge badge-neutral/80 font-mono text-xs text-white px-3 py-2.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {project.estimatedTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-base-content leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-base-content/80 leading-relaxed max-w-4xl">
          {project.summary}
        </p>

        {/* Etiketler */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-base-200 border border-base-300 text-base-content/80 font-mono text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Hızlı Aksiyon Çubuğu */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {project.playgroundPresetId && (
            <Link
              href={`/playground?preset=${project.playgroundPresetId}`}
              className="btn btn-primary font-mono text-xs rounded-xl shadow-md gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Web IDE'de Çalıştır &amp; Simüle Et</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </Link>
          )}

          <a
            href="#wiring-section"
            className="btn btn-outline btn-neutral font-mono text-xs rounded-xl gap-2"
          >
            <Radio className="w-3.5 h-3.5 text-secondary" />
            <span>Pin Şeması</span>
          </a>

          <a
            href="#code-section"
            className="btn btn-outline btn-neutral font-mono text-xs rounded-xl gap-2"
          >
            <Code2 className="w-3.5 h-3.5 text-accent" />
            <span>Kaynak Kod</span>
          </a>

          <a
            href="#steps-section"
            className="btn btn-outline btn-neutral font-mono text-xs rounded-xl gap-2"
          >
            <Wrench className="w-3.5 h-3.5 text-warning" />
            <span>Montaj Adımları</span>
          </a>
        </div>
      </header>

      {/* 3. BÜYÜK PROJE BANNER GÖRSELİ */}
      <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden border border-base-300 shadow-xl bg-base-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono drop-shadow-md">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <CircuitBoard className="w-4 h-4 text-primary" />
            Açık Kaynak Donanım Projesi
          </span>
          <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            {project.hardwareBOM.length} Modül • {project.wiring.length} Bağlantı Hattı
          </span>
        </div>
      </div>

      {/* 4. ÖZET TEKNİK İSTATİSTİKLER (GRID CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">Kategori</span>
          <span className="font-bold text-sm text-base-content flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{project.category}</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">Zorluk &amp; Süre</span>
          <span className="font-bold text-sm text-base-content flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-secondary shrink-0" />
            <span>{project.difficulty} • {project.estimatedTime}</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">BOM Malzeme</span>
          <span className="font-bold text-sm text-base-content flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-accent shrink-0" />
            <span>{project.hardwareBOM.length} Farklı Bileşen</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-base-200/70 border border-base-300 space-y-1">
          <span className="text-[11px] font-mono text-base-content/60 uppercase block">Yazılım / Dil</span>
          <span className="font-bold text-sm text-base-content flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-warning shrink-0" />
            <span className="uppercase">{project.sourceCode.language}</span>
          </span>
        </div>
      </div>

      {/* 5. MALZEME LİSTESİ (BOM - BILL OF MATERIALS) */}
      <section id="bom-section" className="space-y-4 pt-4 border-t border-base-300">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Gerekli Donanımlar</span>
            </div>
            <h2 className="text-2xl font-black text-base-content">
              Malzeme Listesi (Bill of Materials - BOM)
            </h2>
          </div>
          <span className="badge badge-neutral font-mono text-xs">
            {project.hardwareBOM.length} Kalem
          </span>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead className="bg-base-200/80 font-mono text-base-content/70">
                <tr>
                  <th className="w-12 text-center">#</th>
                  <th>Parça / Modül Adı</th>
                  <th className="w-28 text-center">Adet</th>
                  <th>Teknik Özellik &amp; Öneri Notu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {project.hardwareBOM.map((item, idx) => (
                  <tr key={idx} className="hover:bg-base-200/40">
                    <td className="text-center font-mono font-bold text-base-content/50">
                      {idx + 1}
                    </td>
                    <td className="font-bold text-base-content text-sm">
                      {item.item}
                    </td>
                    <td className="text-center font-mono font-bold text-primary">
                      {item.count}
                    </td>
                    <td className="text-base-content/75 font-sans">
                      {item.note || "Standart uyumlu model"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-info/10 border border-info/20 flex items-start gap-3 text-xs text-base-content/85">
          <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
          <p>
            <strong>Tedarik İpucu:</strong> Projede listelenen tüm parçalar Türkiye'deki yerel robotik mağazalarından veya üniversite/Ar-Ge laboratuvarı stoklarından kolaylıkla temin edilebilir. Farklı revizyondaki modülleri kullanırken pin yerleşimlerine dikkat ediniz.
          </p>
        </div>
      </section>

      {/* 6. PIN VE SİNYAL BAĞLANTI TABLOSU (WIRING) */}
      <section id="wiring-section" className="space-y-4 pt-4 border-t border-base-300">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs font-bold uppercase tracking-wider">
              <Radio className="w-4 h-4" />
              <span>Elektriksel Bağlantı</span>
            </div>
            <h2 className="text-2xl font-black text-base-content">
              Pin &amp; Sinyal Bağlantı Tablosu
            </h2>
          </div>
          <span className="badge badge-secondary badge-outline font-mono text-xs">
            {project.wiring.length} Bağlantı Hattı
          </span>
        </div>

        <p className="text-xs sm:text-sm text-base-content/70">
          Devreyi kurmadan önce güç ve toprak hatlarını bağlayın. Aşağıdaki pin eşleşmelerini birebir uygulayarak sensör ve modüllerinizi ana denetleyiciye bağlayınız.
        </p>

        <div className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs font-mono">
              <thead className="bg-base-200/80 text-base-content/70">
                <tr>
                  <th className="w-28">Sinyal Türü</th>
                  <th>Kaynak Pin / Hat (From)</th>
                  <th className="w-12 text-center">İletim</th>
                  <th>Hedef Pin / Aygıt (To)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {project.wiring.map((w, idx) => (
                  <tr key={idx} className="hover:bg-base-200/40">
                    <td>
                      <span className={`badge badge-xs font-bold font-mono px-2 py-0.5 ${getWiringBadgeClass(w.type)}`}>
                        {w.type}
                      </span>
                    </td>
                    <td className="font-bold text-base-content">{w.from}</td>
                    <td className="text-center text-base-content/40 font-sans">➔</td>
                    <td className="font-bold text-primary">{w.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-warning/10 border border-warning/20 flex items-start gap-3 text-xs text-base-content/85">
          <ShieldAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <p>
            <strong>Mantık Seviyesi (Logic Level) Uyarısı:</strong> 3.3V seviyesinde çalışan çiplerle (ESP32, STM32, Raspberry Pi) 5V çalışan modülleri bağlarken gerilim bölücü veya Logic Level Shifter kullandığınızdan emin olun. Doğrudan 5V girişi mikroişlemciyi kalıcı olarak yakabilir.
          </p>
        </div>
      </section>

      {/* 7. KAYNAK KOD BÖLÜMÜ */}
      <section id="code-section" className="space-y-4 pt-4 border-t border-base-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>Yazılım / Firmware</span>
            </div>
            <h2 className="text-2xl font-black text-base-content">
              Üretime Hazır Kaynak Kod
            </h2>
          </div>

          {project.playgroundPresetId && (
            <Link
              href={`/playground?preset=${project.playgroundPresetId}`}
              className="btn btn-sm btn-primary font-mono text-xs rounded-xl shadow-xs gap-1.5 self-start sm:self-auto"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Web IDE'de Aç &amp; Test Et</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden border border-base-300 shadow-md">
          <CodeBlock
            code={project.sourceCode.code}
            language={project.sourceCode.language}
            caption={project.sourceCode.caption}
          />
        </div>
      </section>

      {/* 8. ADIM ADIM KURULUM VE MONTAJ REHBERİ */}
      <section id="steps-section" className="space-y-6 pt-4 border-t border-base-300">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-warning font-mono text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>Uygulama Rehberi</span>
          </div>
          <h2 className="text-2xl font-black text-base-content">
            Adım Adım Kurulum, Montaj ve Test
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70">
            Aşağıdaki adımları sırasıyla takip ederek projeyi başarıyla çalışır hale getirebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {project.steps.map((step) => (
            <div
              key={step.number}
              className="p-5 sm:p-6 rounded-2xl bg-base-100 border border-base-300 shadow-xs hover:border-primary/40 transition-all space-y-2.5 relative"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-primary text-primary-content font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {step.number}
                </span>
                <h3 className="font-extrabold text-base text-base-content">
                  {step.title}
                </h3>
              </div>

              <div className="pl-10 text-xs sm:text-sm text-base-content/80 leading-relaxed">
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. İLGİLİ PROJELER (RELATED PROJECTS) */}
      <section className="space-y-6 pt-8 border-t border-base-300">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-base-content">
            Diğer İlgili Projeler
          </h2>
          <p className="text-xs text-base-content/60 font-mono">
            Bu projeyi tamamladıktan sonra inceleyebileceğiniz diğer açık kaynak gömülü &amp; robotik tarifleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedProjects.map((rel) => (
            <Link
              key={rel.id}
              href={`/projects/${rel.id}`}
              className="group card bg-base-100 border border-base-300 overflow-hidden shadow-xs hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 w-full bg-base-200 overflow-hidden border-b border-base-300">
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="badge badge-primary badge-xs font-mono font-bold shadow-xs">
                    {rel.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-base-content group-hover:text-primary transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-base-content/70 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-base-200 flex items-center justify-between text-xs font-mono text-primary font-bold">
                  <span>Rehberi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

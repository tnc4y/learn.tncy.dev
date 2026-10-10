import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DEV_BOARDS, DevBoard } from "@/data/boardsData";
import { getBoardPinout } from "@/data/pinoutsData";
import { getGuideForBoard } from "@/data/guidesData";
import { PROJECT_RECIPES, ProjectRecipe } from "@/data/projectsData";
import BoardDetailView from "./BoardDetailView";

export function generateStaticParams() {
  return DEV_BOARDS.map((board) => ({
    id: board.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const board = DEV_BOARDS.find((b) => b.id === id);

  if (!board) {
    return {
      title: "Geliştirme Kartı Bulunamadı | learn.tncy.dev",
    };
  }

  return {
    title: `${board.name} (${board.chipset}) Pinout & Teknik Özellikler | learn.tncy.dev`,
    description: `${board.name} pin şeması, teknik özellikleri, ${board.chipset} çipi, ${board.operatingVoltage} voltaj limitleri ve hızlı başlangıç rehberi.`,
    keywords: [
      board.name,
      board.chipset,
      board.vendor,
      board.architecture,
      "pinout",
      "geliştirme kartı",
      "gömülü sistemler",
    ],
    openGraph: {
      title: `${board.name} - Pinout & Teknik Datasheet`,
      description: board.description,
      type: "website",
    },
  };
}

export default async function BoardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = DEV_BOARDS.find((b) => b.id === id);

  if (!board) {
    notFound();
  }

  const pinout = getBoardPinout(board.id);
  const guide = getGuideForBoard(board.id);

  // Bu kartla ilişkili projeleri tespit et
  const relatedProjects = PROJECT_RECIPES.filter((p) => {
    const bId = board.id.toLowerCase();
    const pTitle = (p.title + " " + p.summary + " " + p.hardwareBOM.map((b) => b.item).join(" ")).toLowerCase();

    if (bId.includes("esp32") && pTitle.includes("esp32")) return true;
    if (bId.includes("arduino") && (pTitle.includes("arduino") || pTitle.includes("web serial"))) return true;
    if (bId.includes("stm32") && pTitle.includes("stm32")) return true;
    if ((bId.includes("basys") || bId.includes("de10") || bId.includes("icestick")) && (pTitle.includes("fpga") || pTitle.includes("systemverilog"))) return true;
    if ((bId.includes("raspberry-pi-5") || bId.includes("jetson")) && (pTitle.includes("ros 2") || pTitle.includes("raspberry pi") || pTitle.includes("pi-hole") || pTitle.includes("opencv"))) return true;
    if (bId.includes("pico") && (pTitle.includes("pico") || pTitle.includes("micro-ros"))) return true;

    return false;
  }).slice(0, 3);

  // Diğer geliştirme kartları
  const otherBoards = DEV_BOARDS.filter((b) => b.id !== board.id)
    .sort((a, b) => (a.family === board.family ? -1 : 1))
    .slice(0, 3);

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: board.name,
    description: board.description,
    brand: {
      "@type": "Brand",
      name: board.vendor,
    },
    category: board.family,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BoardDetailView
        board={board}
        pinout={pinout}
        guide={guide}
        relatedProjects={relatedProjects}
        otherBoards={otherBoards}
      />
    </>
  );
}

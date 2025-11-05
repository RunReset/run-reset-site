"use client";

import { useEffect, useMemo, useState } from "react";

/* =========================
   FIX: Legg til tydelige typer
   ========================= */
type Distance = "5km" | "10km";                      // FIX
type PreviewType = "pdf" | "images";                 // FIX
type Product = {                                     // FIX
  key: string;
  label: string;
  price: string;
  link: string;                 // Stripe-lenke
  previewType: PreviewType;
  previewLink?: string;         // påkrevd når previewType = "pdf"
  previewSlides?: string[];     // brukt når previewType = "images"
};
type Catalog = Record<Distance, Product[]>;          // FIX


export default function Page() {
  // Farger
  const colors = {
    pine: "#0B3D2E",
    moss: "#3F6B4F",
    fern: "#6F8F72",
    sand: "#E6E0D6",
    sky:  "#E7F1F5",
    stone:"#1F2937",
  };

// PRODUKTER – fyll inn dine Stripe-lenker og utdrags-filer i /public/previews
const products: Catalog = {                          // FIX: typet som Catalog
  "5km": [
    { key: "5km_sub15", label: "Sub 15", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_5KM_SUB15",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" }, // FIX: unngå mellomrom i filnavn
    { key: "5km_sub16", label: "Sub 16", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_5KM_SUB16",
      previewType: "images", previewSlides: ["/previews/5km_sub16_p1.jpg","/previews/utdrag-fra-lopeplan.jpg"] },
    { key: "5km_sub18", label: "Sub 18", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_5KM_SUB18",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
    { key: "5km_sub20", label: "Sub 20", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_5KM_SUB20",
      previewType: "images", previewSlides: ["/previews/5km_sub20_p1.jpg","/previews/utdrag-fra-lopeplan.jpg"] },
    { key: "5km_sub22", label: "Sub 22", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_5KM_SUB22",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
    { key: "5km_sub25", label: "Sub 25", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_5KM_SUB25",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
  ],
  "10km": [
    { key: "10km_sub34", label: "Sub 34", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB34",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
    { key: "10km_sub36", label: "Sub 36", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB36",
      previewType: "images", previewSlides: ["/previews/10km_sub36_p1.jpg","/previews/utdrag-fra-lopeplan.jpg"] },
    { key: "10km_sub37", label: "Sub 37", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB37",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
    { key: "10km_sub38", label: "Sub 38", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB38",
      previewType: "images", previewSlides: ["/previews/utdrag-fra-lopeplan.jpg"] },
    { key: "10km_sub40", label: "Sub 40", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB40",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
    { key: "10km_sub42", label: "Sub 42", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB42",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
    { key: "10km_sub45", label: "Sub 45", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB45",
      previewType: "images", previewSlides: ["/previews/10km_sub45_p1.jpg","/previews/utdrag-fra-lopeplan.jpg"] },
    { key: "10km_sub50", label: "Sub 50", price: "229 kr",
      link: "https://buy.stripe.com/REPLACE_10KM_SUB50",
      previewType: "pdf", previewLink: "/previews/utdrag-fra-lopeplan.jpg" },
  ],
};


// Valg-state
const [distance, setDistance] = useState<Distance>("5km");
const goals = useMemo<Product[]>(() => products[distance], [distance]);

const [goalKey, setGoalKey] = useState<string>(
  goals[3]?.key || products["5km"][0].key
);

const selected = useMemo<Product>(
  () => goals.find((g) => g.key === goalKey) || goals[0],
  [goals, goalKey]
);



const [isPreviewOpen, setPreviewOpen] = useState(false);
const [previewPDF, setPreviewPDF] = useState<string | null>(null);
const [previewImages, setPreviewImages] = useState<string[] | null>(null);

function openPreview(p: Product) {
  if (p.previewType === "pdf" && p.previewLink) {
    setPreviewPDF(p.previewLink);
    setPreviewImages(null);
  } else if (p.previewType === "images" && p.previewSlides?.length) {
    setPreviewImages(p.previewSlides);
    setPreviewPDF(null);
  }
  setPreviewOpen(true);
  document.documentElement.style.overflow = "hidden";
}

function closePreview(): void {
  setPreviewOpen(false);
  setPreviewPDF(null);
  setPreviewImages(null);
  document.documentElement.style.overflow = "";
}



  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePreview();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight text-lg">Run Reset - løpeplaner for 5km og 10km</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#velgplan" className="hover:text-black">Velg plan</a>
            <a href="#how" className="hover:text-black"></a>
            <a href="#footer" className="hover:text-black"></a>
          </nav>
          <a href="#velgplan" className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium hover:shadow">Kjøp plan</a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(1200px 600px at 80% -20%, ${colors.sky}, transparent),
                         radial-gradient(800px 400px at -10% 10%, ${colors.sand}, transparent)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
              Løpeprogrammer som passer hverdagen din
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl leading-relaxed">
              Løpeprogrammer utviklet for løpere som søker struktur, kvalitet og målbar fremgang.<br />
              I løpet av ti uker kombineres utholdenhet, fart og restitusjon i et helhetlig opplegg som bygger både kapasitet og løpsglede.<br />
              Hver uke har et tydelig formål og progresjon – slik at du stiller til start med overskudd, fokus og trygghet på egen form.
            </p>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
              Velg en plan som matcher dine ambisjoner. Enten du vil bryte 20-minuttersgrensen på 5 km,
              komme under 50 minutter på 10 km, eller sikter mot sub 37 – du får et strukturert opplegg
              med tydelig progresjon og riktig balanse mellom trening og hvile.
            </p>
          </div>

          {/* Hero-visual placeholder */}
          <div className="relative">
          <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden border shadow-sm bg-white">
  <img
    src="/woman-8155652_1280.jpg"
    alt="To løpere på skandinavisk natursti"
    className="w-full h-full object-cover"
  />
</div>

            <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur rounded-2xl shadow p-4 border w-64">
              <p className="text-sm font-medium">Eksempeluke</p>
              <ul className="mt-2 text-xs space-y-1 text-gray-600">
                <li>✓ Rolig 40–50 min</li>
                <li>✓ Terskelintervall 4×6 min</li>
                <li>✓ Langkjøring 70–80 min</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VELG PLAN */}
      <section id="velgplan" className="py-16" style={{ backgroundColor: colors.sky }}>
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-semibold text-center">Velg plan etter mål</h2>
          <p className="text-center text-gray-600 mt-2">Forhåndsvis et utdrag og kjøp trygt med Stripe.</p>

          <div className="mx-auto mt-8 max-w-2xl rounded-3xl border bg-white p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="text-sm text-gray-700">
                Distanse
                <select
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none"
                  value={distance}
                  onChange={(e) => {
                    const d = e.target.value as Distance;   // FIX
                    setDistance(d);
                    setGoalKey(products[d][0].key);         // FIX: nå er d garantert '5km' | '10km'
                  }}
                  
                >
                  <option value="5km">5 km</option>
                  <option value="10km">10 km</option>
                </select>
              </label>

              <label className="text-sm text-gray-700">
                Mål (sub-tid)
                <select
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none"
                  value={goalKey}
                  onChange={(e) => setGoalKey(e.target.value)}
                >
                  {goals.map((g) => (
                    <option key={g.key} value={g.key}>{g.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 rounded-2xl border p-4 bg-gray-50">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-sm text-gray-500">Valgt plan</p>
                  <p className="font-medium">{distance.toUpperCase()} – {goals.find(g => g.key === goalKey)?.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Pris</p>
                  <p className="font-semibold text-lg">{selected.price}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openPreview(selected)}
                  className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-medium border hover:shadow"
                >
                  Se utdrag fra en løpeplan
                </button>
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white"
                  style={{ backgroundColor: colors.moss }}
                >
                  Kjøp nå
                </a>
              </div>

              <p className="mt-2 text-xs text-gray-500">Hele planen leveres via Stripe etter kjøp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-medium text-gray-900">Run Reset</p>
            <p className="mt-2 text-gray-600">Strukturerte løpeplaner tilpasset dine ambisjoner.</p>
          </div>
          <div className="space-y-2 text-gray-600">
            <a href="#velgplan" className="block hover:text-gray-900">Velg plan</a>
            <a href="mailto:reset.run.reset@gmail.com" className="block hover:text-gray-900">Kontakt: reset.run.reset@gmail.com</a>
          </div>
          <div className="text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Løpeprogram. Alle rettigheter reservert.</p>
            <p className="mt-2">Org.nr: <span className="font-medium">[Ditt organisasjonsnummer her]</span></p>
            <p className="mt-2">Oslo, Norge</p>
          </div>
        </div>
      </footer>

      {/* MODAL – kun utdrag */}
      {isPreviewOpen && (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative z-[101] w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}

          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="font-medium">Forhåndsvis utdrag</p>
              <button onClick={closePreview} className="rounded-lg border px-3 py-1 text-sm hover:shadow">Lukk</button>
            </div>

            {/* PDF-utdrag */}
            {previewPDF && (
              <div className="w-full" style={{ height: "75vh" }}>
                <iframe title="Plan-utdrag" src={`${encodeURI(previewPDF!)}#toolbar=0&navpanes=0`} className="w-full h-full" />
              </div>
            )}

{/* Bilder-utdrag */}
{previewImages && (
  <div
    className="w-full bg-gray-50 text-center"
    style={{ maxHeight: "75vh", overflowY: "auto" }}
  >
    {previewImages.map((src) => (
      <div key={src} className="mb-4">
        <img
          src={src}
          alt="Utdrag"
          className="w-full block mx-auto"
        />
        <p className="mt-2 text-xs text-gray-500 italic">
          
        </p>
      </div>
    ))}
  </div>
)}


            <div className="border-t px-4 py-3 text-xs text-gray-500">
              Dette er kun et eksempelutdrag av en løpeplan. Din spesifikke plan får du etter betaling.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

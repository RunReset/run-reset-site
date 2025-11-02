import { motion } from "framer-motion";

export default function LopeprogramLanding() {
  const colors = {
    pine: "#0B3D2E",
    moss: "#3F6B4F",
    fern: "#6F8F72",
    sand: "#E6E0D6",
    sky: "#E7F1F5",
    stone: "#1F2937",
  };

  const plans = [
    {
      name: "5 km på 10 uker",
      price: "129 kr",
      description:
        "Trygg progresjon for nybegynnere. 3 økter i uken, skadeforebyggende fokus.",
      bullets: [
        "3 økter/uke (rolig, intervall, langkjøring)",
        "Oppvarming & mobilitet (PDF)",
        "Tydelige intensitetssoner",
      ],
      checkout: "https://buy.stripe.com/YOUR_LINK_5K",
    },
    {
      name: "10 km på 10 uker",
      price: "129 kr",
      description:
        "For deg som løper litt fra før. 4 økter i uken med smart fartstrening.",
      bullets: [
        "4 økter/uke inkl. terskel",
        "Styrke for løpere (video)",
        "Ukesoversikt + kalender",
      ],
      highlight: true,
      checkout: "https://buy.stripe.com/YOUR_LINK_10K",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight text-lg">Løpeprogram</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#how" className="hover:text-black">Slik funker det</a>
            <a href="#plans" className="hover:text-black">Planer</a>
            <a href="#footer" className="hover:text-black">Kontakt</a>
          </nav>
          <a href="#plans" className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium hover:shadow">Kjøp plan</a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(1200px 600px at 80% -20%, ${colors.sky}, transparent), radial-gradient(800px 400px at -10% 10%, ${colors.sand}, transparent)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900"
            >
              Løpeprogrammer som passer hverdagen din
            </motion.h1>
            <p className="mt-4 text-lg text-gray-600">
              Stilren, skandinavisk progresjon: 10-ukers planer med klare økter og smarte alternativer. Fra første 5 km til trygg 10 km.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#plans"
                className="rounded-xl px-5 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: colors.pine }}
              >
                Se planer
              </a>
              <a
                href="#how"
                className="rounded-xl border px-5 py-3 text-sm font-medium hover:shadow"
              >
                Slik funker det
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-2"><i>✓</i>Skadeforebyggende</span>
              <span className="flex items-center gap-2"><i>✓</i>Tidsbesparende</span>
              <span className="flex items-center gap-2"><i>✓</i>Vitenskapsbasert</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl border shadow-sm bg-white" />
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

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {["Velg plan", "Betal sikkert", "Løp med trygghet"].map((title, i) => (
            <div key={title} className="p-6 rounded-3xl border bg-white shadow-sm">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: i === 0 ? colors.sky : i === 1 ? colors.sand : "#F3F4F6" }}
              >
                {i + 1}
              </div>
              <h3 className="font-medium text-lg">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {i === 0
                  ? "Finn planen som matcher mål og hverdag. 5 km eller 10 km."
                  : i === 1
                  ? "Stripe Checkout – kort, Apple Pay/Klarna. Kvittering i innboksen."
                  : "Følg uke for uke med tydelige intensitetssoner og alternativer."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-16" style={{ backgroundColor: colors.sky }}>
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-semibold text-center">Velg din plan</h2>
          <p className="text-center text-gray-600 mt-2">Engangsbetaling. Umiddelbar tilgang (PDF).</p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-3xl border bg-white p-6 flex flex-col ${
                  p.highlight ? "ring-2" : ""
                }`}
                style={{
                  boxShadow: p.highlight ? `0 0 0 2px ${colors.moss} inset` : undefined,
                }}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
                  <p className="mt-1 text-gray-600 text-sm">{p.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-semibold">{p.price}</span>
                    <span className="text-gray-500 text-sm"> / engangsbetaling</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={p.checkout}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white"
                  style={{ backgroundColor: colors.moss }}
                >
                  Kjøp {p.name}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Betaling håndteres av Stripe. Klarna kan aktiveres i Stripe-kontoen.
          </p>
        </div>
      </section>

      {/* Minimal band */}
      <section className="border-y" style={{ backgroundColor: colors.sand }}>
        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-gray-700">
          <div>
            <p className="text-2xl font-semibold text-gray-900">10 uker</p>
            <p>per plan</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">2 planer</p>
            <p>5 km & 10 km</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">PDF</p>
            <p>umiddelbar tilgang</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">E-post</p>
            <p>kvittering/lenke</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-medium text-gray-900">Løpeprogram</p>
            <p className="mt-2 text-gray-600">Stilrene løpeplaner med fokus på kvalitet og ro i hverdagen.</p>
          </div>
          <div className="space-y-2 text-gray-600">
            <a href="#plans" className="block hover:text-gray-900">Planer</a>
            <a href="#how" className="block hover:text-gray-900">Slik funker det</a>
            <a href="mailto:epost@lopeplaner.no" className="block hover:text-gray-900">Kontakt</a>
          </div>
          <div className="text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Løpeprogram. Alle rettigheter reservert.</p>
            <p className="mt-2">Org.nr: <span className="font-medium">[Ditt organisasjonsnummer her]</span></p>
            <p className="mt-2">Oslo, Norge</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

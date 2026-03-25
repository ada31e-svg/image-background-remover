import { BackgroundRemover } from "./components/background-remover";

const features = [
  {
    title: "Instant and easy to use",
    description:
      "Open the page, upload an image, and get a clean cutout in seconds without installing anything.",
  },
  {
    title: "Secure server-side processing",
    description:
      "Images are sent through a protected server route so sensitive credentials stay off the client.",
  },
  {
    title: "Built to convert visitors",
    description:
      "The layout is designed like a modern tool landing page, ready for SEO, pricing, and future upgrades.",
  },
];

const useCases = [
  "Product photos",
  "Profile pictures",
  "Marketing creatives",
  "YouTube thumbnails",
  "Social media graphics",
  "Quick design edits",
];

const faqs = [
  {
    question: "What image formats are supported?",
    answer: "You can upload JPG, PNG, and WEBP files. The current file size limit is 10MB per image.",
  },
  {
    question: "How fast is background removal?",
    answer: "Most images are processed within a few seconds, depending on image size and network conditions.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. This version is focused on a fast upload-to-download workflow with no sign-up required.",
  },
  {
    question: "What can be added next?",
    answer: "Future upgrades can include batch processing, account credits, payments, history, and more SEO landing pages.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f8fb] text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_32%),linear-gradient(180deg,_#ffffff,_#f6f8fb)]" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                IR
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Image Background Remover</p>
                <p className="text-xs text-slate-500">Online background removal tool</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                Transparent PNG
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                No sign-up required
              </span>
            </div>
          </header>

          <BackgroundRemover />

          <section className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur"
              >
                <div className="mb-4 h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500" />
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">{feature.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-white/70 bg-slate-950 p-7 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)] lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Use cases</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Perfect for sellers, creators, marketers, and anyone who needs clean images fast.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Whether you are preparing product shots, profile images, ad creatives, or quick visual assets, this tool is built to help you move from upload to export with minimal friction.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {useCases.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">How it works</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                A simple workflow built for fast results
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  "Upload a single image from your device.",
                  "We process it through a secure server-side flow.",
                  "Preview the cutout and download a transparent PNG instantly.",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-7 text-slate-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur lg:p-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Common questions before you try the tool
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                These answers are written for a straightforward tool experience and can later expand into SEO-focused help content.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5"
                >
                  <h3 className="text-base font-semibold text-slate-950">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

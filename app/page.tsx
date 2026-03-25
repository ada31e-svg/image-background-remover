import { BackgroundRemover } from "./components/background-remover";

const features = [
  {
    title: "一键上传",
    description: "上传 JPG、PNG 或 WEBP，前后端都会做格式和大小校验。",
  },
  {
    title: "自动去背景",
    description: "通过服务端 Route Handler 调用 Remove.bg API，避免暴露 API Key。",
  },
  {
    title: "下载透明 PNG",
    description: "处理完成后立即预览结果，并下载透明背景 PNG 文件。",
  },
];

const useCases = ["商品图", "人像头像", "社媒素材", "证件照", "营销设计稿", "博客配图"];

const faqs = [
  {
    question: "支持哪些格式？",
    answer: "当前 MVP 支持 JPG、PNG、WEBP，单张图片限制为 10MB。",
  },
  {
    question: "是如何去背景的？",
    answer: "前端上传图片到 Next.js API，服务端再调用 Remove.bg API 获取透明背景 PNG。",
  },
  {
    question: "为什么要走服务端？",
    answer: "这样可以保护 Remove.bg API Key，不在浏览器端暴露敏感凭据。",
  },
  {
    question: "后续还会加什么？",
    answer: "可继续加登录、额度、支付、批量处理、历史记录和 Cloudflare 部署配置。",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f0fdf4,_#f8fafc_45%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                MVP Ready
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Image Background Remover
              </h1>
            </div>
            <div className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              Next.js + Tailwind CSS + Remove.bg API
            </div>
          </div>
          <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            这是基于 MVP 需求文档实现的第一版工具站首页：包含上传、处理、预览、下载、功能说明、适用场景与 FAQ，后续可直接接 Cloudflare 部署。
          </p>
        </header>

        <BackgroundRemover />

        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              适用场景
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              这版先覆盖最核心的在线去背景需求，后续可以继续扩展为批量处理、电商图优化、背景替换等功能。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {useCases.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How it works</h2>
            <ol className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
              <li>
                <span className="font-semibold text-slate-900">1.</span> 用户上传图片，前端先检查格式和大小。
              </li>
              <li>
                <span className="font-semibold text-slate-900">2.</span> Next.js Route Handler 接收文件并调用 Remove.bg API。
              </li>
              <li>
                <span className="font-semibold text-slate-900">3.</span> 成功后返回透明背景 PNG，在页面上预览并下载。
              </li>
            </ol>
          </div>
        </section>

        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm lg:p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              覆盖需求文档中的基础说明，方便后续直接扩展 SEO 内容。
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

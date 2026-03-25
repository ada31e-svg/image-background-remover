"use client";

import { ChangeEvent, useMemo, useState } from "react";

type RequestState = "idle" | "uploading" | "success" | "error";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 16V5m0 0-4 4m4-4 4 4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<RequestState>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => !!selectedFile && status !== "uploading",
    [selectedFile, status],
  );

  function resetResult() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
  }

  function validateFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPG, PNG, and WEBP files are supported.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return `The maximum file size is ${formatBytes(MAX_FILE_SIZE)}.`;
    }
    return null;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError(null);
    resetResult();

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("idle");
  }

  async function handleSubmit() {
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("uploading");
    setError(null);
    resetResult();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "Something went wrong. Please try again.");
      }

      const blob = await response.blob();
      setResultUrl(URL.createObjectURL(blob));
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur xl:p-8">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_70%)]" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">Fast results</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Transparent PNG</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">No design skills needed</span>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Remove backgrounds instantly
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
              Remove the background from any image in just a few clicks.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Upload your image, remove the background automatically, preview the result, and download a transparent PNG that is ready for ecommerce, marketing, or content creation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
              <p className="text-2xl font-semibold text-slate-950">Fast</p>
              <p className="mt-1 text-sm text-slate-500">Built for quick turnaround</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
              <p className="text-2xl font-semibold text-slate-950">Clean</p>
              <p className="mt-1 text-sm text-slate-500">Transparent PNG output</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
              <p className="text-2xl font-semibold text-slate-950">Simple</p>
              <p className="mt-1 text-sm text-slate-500">No account needed to try</p>
            </div>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-slate-200/20 bg-slate-950 p-5 text-white shadow-[0_18px_60px_rgba(15,23,42,0.22)] sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Before</p>
              <div className="mt-3 flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 via-rose-50 to-violet-100 text-sm text-slate-500">
                Original image preview
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">After</p>
              <div className="checkerboard mt-3 flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/10 text-sm text-slate-400">
                Transparent result preview
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] xl:p-8">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-100 blur-3xl" />
        <div className="relative flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Start for free
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Upload an image and download the cutout instantly
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This version focuses on the core workflow: upload one image, remove the background, preview the output, and download it right away.
            </p>
          </div>

          <label
            htmlFor="image-upload"
            className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-emerald-300 hover:bg-emerald-50/40"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15 transition group-hover:bg-emerald-600">
              <UploadIcon />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-950">Upload your image</p>
              <p className="mt-2 text-sm text-slate-500">
                JPG, PNG, or WEBP · Up to 10MB · One image at a time
              </p>
            </div>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Selected file</p>
                <p className="mt-1 text-base font-semibold text-slate-950">
                  {selectedFile ? selectedFile.name : "No image selected yet"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedFile ? formatBytes(selectedFile.size) : "Choose an image to begin"}
                </p>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500">
                {status === "uploading"
                  ? "Processing"
                  : status === "success"
                    ? "Done"
                    : status === "error"
                      ? "Error"
                      : "Ready"}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {status === "uploading" ? "Removing background..." : "Remove Background"}
            </button>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">Original</p>
                <span className="text-xs text-slate-400">Before</span>
              </div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Original image preview" className="h-full w-full object-contain" />
                ) : (
                  <p className="px-6 text-center text-sm text-slate-400">Original image preview</p>
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">Result</p>
                <span className="text-xs text-emerald-500">After</span>
              </div>
              <div className="checkerboard flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {resultUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resultUrl} alt="Background removal result preview" className="h-full w-full object-contain" />
                ) : (
                  <p className="px-6 text-center text-sm text-slate-400">Transparent PNG preview</p>
                )}
              </div>
            </div>
          </div>

          <a
            href={resultUrl ?? undefined}
            download={selectedFile ? `${selectedFile.name.replace(/\.[^.]+$/, "")}-no-bg.png` : "removed-background.png"}
            className={`inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-medium transition ${
              resultUrl
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "pointer-events-none bg-slate-200 text-slate-400"
            }`}
          >
            Download transparent PNG
          </a>
        </div>
      </div>
    </section>
  );
}

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
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }
    setResultUrl(null);
  }

  function validateFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "仅支持 JPG、PNG、WEBP 格式。";
    }

    if (file.size > MAX_FILE_SIZE) {
      return `图片大小不能超过 ${formatBytes(MAX_FILE_SIZE)}。`;
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
        throw new Error(payload?.error || "处理失败，请稍后重试。");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setResultUrl(objectUrl);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "处理失败，请稍后重试。");
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
              Image Background Remover
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Remove background from images online in seconds
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              上传图片，自动调用 Remove.bg API 去除背景，返回透明 PNG。
              这是用于验证 MVP 的第一版工具页。
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
            <label
              htmlFor="image-upload"
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-transparent px-6 py-10 text-center transition hover:border-slate-200 hover:bg-white"
            >
              <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                选择图片
              </div>
              <div>
                <p className="text-base font-medium text-slate-900">
                  支持 JPG / PNG / WEBP，单张不超过 10MB
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  可直接点击上传，后续可扩展拖拽上传。
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
          </div>

          {selectedFile ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div>
                <p className="font-medium text-slate-900">{selectedFile.name}</p>
                <p>{formatBytes(selectedFile.size)}</p>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="rounded-full bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {status === "uploading" ? "处理中..." : "Remove Background"}
              </button>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex h-full flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">预览与下载</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              左侧上传图片后，接口会返回透明背景 PNG，处理完成后可直接下载。
            </p>
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-medium text-slate-700">原图</p>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="原图预览" className="h-full w-full object-contain" />
                ) : (
                  <p className="px-6 text-center text-sm text-slate-400">上传后显示原图预览</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-medium text-slate-700">结果图</p>
              <div className="checkerboard flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {resultUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resultUrl} alt="抠图结果预览" className="h-full w-full object-contain" />
                ) : (
                  <p className="px-6 text-center text-sm text-slate-400">
                    处理完成后显示透明背景 PNG
                  </p>
                )}
              </div>
            </div>
          </div>

          <a
            href={resultUrl ?? undefined}
            download={selectedFile ? `${selectedFile.name.replace(/\.[^.]+$/, "")}-no-bg.png` : "removed-background.png"}
            className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
              resultUrl
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "pointer-events-none bg-slate-200 text-slate-400"
            }`}
          >
            下载透明 PNG
          </a>
        </div>
      </div>
    </section>
  );
}

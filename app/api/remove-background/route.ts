import { NextRequest } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  const apiKey = process.env.REMOVE_BG_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "服务端未配置 REMOVE_BG_API_KEY。" },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "请先上传图片。" }, { status: 400 });
    }

    if (!ACCEPTED_TYPES.has(file.type)) {
      return Response.json(
        { error: "仅支持 JPG、PNG、WEBP 格式。" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "图片大小不能超过 10MB。" },
        { status: 400 },
      );
    }

    const upstreamForm = new FormData();
    upstreamForm.append("image_file", file, file.name);
    upstreamForm.append("size", "auto");

    const upstream = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: upstreamForm,
      cache: "no-store",
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return Response.json(
        {
          error: "Remove.bg 处理失败，请稍后重试。",
          detail: text,
        },
        { status: 502 },
      );
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="removed-background.png"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "服务繁忙，请稍后重试。" },
      { status: 500 },
    );
  }
}

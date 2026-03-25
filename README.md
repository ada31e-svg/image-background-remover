# image-background-remover

基于 **Next.js + Tailwind CSS** 的图片去背景工具 MVP，服务端通过 **Remove.bg API** 处理图片，前端提供上传、预览与下载流程。

## 已实现

- Landing Page 首页
- 图片上传（JPG / PNG / WEBP）
- 前后端文件类型与大小校验（10MB）
- Next.js Route Handler：`/api/remove-background`
- 调用 Remove.bg API 返回透明背景 PNG
- 原图 / 结果图预览
- 下载透明 PNG
- FAQ / 适用场景 / 功能说明
- SEO 基础 metadata

## 技术栈

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- Remove.bg API

## 本地运行

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制环境变量模板：

```bash
cp .env.example .env.local
```

然后填入你的 Remove.bg API Key：

```bash
REMOVE_BG_API_KEY=your_remove_bg_api_key_here
```

### 3. 启动开发环境

```bash
pnpm dev
```

访问：<http://localhost:3000>

## 接口说明

### `POST /api/remove-background`

- 请求格式：`multipart/form-data`
- 字段：`file`
- 支持类型：`image/jpeg`、`image/png`、`image/webp`
- 大小限制：10MB

成功时返回透明背景 PNG 图片流。

## 后续可扩展

- Cloudflare Pages / Workers 部署
- 用户登录与额度系统
- 批量处理
- 历史记录
- 支付订阅
- 埋点统计与 Turnstile 防刷

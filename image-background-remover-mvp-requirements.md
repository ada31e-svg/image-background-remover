# Image Background Remover 网站 MVP 需求文档

## 1. 项目概述

### 1.1 项目名称
**Image Background Remover**

### 1.2 项目目标
开发一个在线图片去背景工具网站，用户上传图片后，系统调用 **Remove.bg API** 自动移除背景，并返回可下载的透明背景 PNG 图片。

### 1.3 MVP 目标
MVP 阶段仅验证以下核心问题：

1. 用户是否有明确的去背景需求
2. 用户是否愿意直接使用网页工具完成处理
3. 页面流程是否顺畅，能否稳定完成“上传 → 处理 → 下载”
4. 网站是否具备后续 SEO 和商业化扩展基础

## 2. 产品定位

### 2.1 目标用户
优先面向以下人群：

- 电商卖家
- 设计师
- 自媒体运营
- 普通用户（证件照、头像、简单图片处理）
- 独立站运营者 / 内容创作者

### 2.2 核心价值
- 无需安装软件
- 在线一键去背景
- 操作简单
- 输出透明 PNG，可直接下载使用

### 2.3 MVP 不做的内容
本期不做：

- 用户登录
- 支付/订阅
- 积分系统
- 历史记录
- 批量处理
- 背景替换
- 图片编辑器
- 多语言复杂切换
- 任务队列系统

## 3. 范围定义

### 3.1 MVP 必做功能
1. 首页展示工具和说明
2. 图片上传
3. 调用 Remove.bg API 执行去背景
4. 返回并预览处理结果
5. 下载透明 PNG
6. 基础异常处理
7. 基础 SEO 信息配置
8. 基础限流和安全保护

### 3.2 MVP 可选增强
1. Before / After 对比展示
2. 示例图片体验
3. 上传后自动压缩或校验尺寸
4. 处理中的 loading 动画
5. FAQ 模块

## 4. 用户流程

### 4.1 主流程
1. 用户进入首页
2. 用户点击上传图片
3. 前端校验图片格式和大小
4. 图片提交到 Cloudflare Worker API
5. Worker 调用 Remove.bg API
6. 返回处理后的 PNG
7. 前端展示结果图
8. 用户点击下载

### 4.2 异常流程
#### 上传失败
- 提示“上传失败，请重试”

#### 文件格式不支持
- 提示“仅支持 JPG、PNG、WEBP 格式”

#### 文件过大
- 提示“图片大小不能超过 X MB”

#### Remove.bg 调用失败
- 提示“处理失败，请稍后重试”

#### 网络异常
- 提示“网络异常，请检查后重试”

## 5. 功能需求

### 5.1 首页 / Landing Page

#### 功能描述
首页用于承接流量、说明产品价值，并提供直接上传入口。

#### 页面模块
**1）Hero 区**
- 标题：突出核心关键词
- 副标题：说明用途
- 上传按钮
- 可选示例图

**2）功能说明**
- 一键上传
- 自动移除背景
- 下载透明 PNG

**3）效果展示**
- 原图 / 结果图对比
- 至少 2~3 组示例

**4）适用场景**
- 商品图
- 人像图
- 社交媒体图片
- 证件照/头像

**5）FAQ**
- 支持哪些格式
- 是否免费
- 处理需要多久
- 下载格式是什么

### 5.2 图片上传功能

#### 输入要求
支持格式：
- JPG
- JPEG
- PNG
- WEBP（可选）

#### 限制要求
- 单张图片大小限制：建议 10MB 以内
- 单次仅支持 1 张图
- 前端先做校验，服务端再次校验

#### 交互要求
- 支持点击上传
- 可选支持拖拽上传
- 上传后展示文件名和预览缩略图

### 5.3 去背景处理功能

#### 功能描述
用户上传图片后，系统调用 Remove.bg API 完成去背景处理。

#### 处理逻辑
1. 接收前端图片
2. 校验格式和大小
3. 调用 Remove.bg API
4. 获取返回结果
5. 返回 PNG 图片给前端

#### 处理状态
- 待上传
- 上传中
- 处理中
- 处理完成
- 处理失败

#### 响应时间目标
- 常规图片处理体验控制在 3~10 秒内
- 超时需提示用户稍后重试

### 5.4 结果展示与下载

#### 展示要求
- 展示处理后的图片
- 可选显示透明棋盘格背景
- 提供下载按钮

#### 下载要求
- 下载文件格式为 PNG
- 文件名建议自动生成，如：
  - `xxx-no-bg.png`

#### 可选增强
- 原图 / 结果图左右对比
- 再上传一张按钮

### 5.5 异常提示

#### 需要覆盖的错误场景
- 未上传文件
- 文件格式错误
- 文件过大
- API 调用失败
- 服务异常
- 请求超时

#### 错误提示原则
- 用户能看懂
- 不暴露内部实现细节
- 提示下一步操作，如“请重试”

## 6. 非功能需求

### 6.1 性能
- 首页首屏加载快
- 图片上传后尽量在 10 秒内给结果
- 处理期间要有明确 loading 状态

### 6.2 安全
- Remove.bg API Key 仅保存在服务端
- 前端不得暴露 API Key
- 接口需限制文件类型和大小
- 建议增加基础限流
- 建议接入 Cloudflare Turnstile 防刷

### 6.3 可用性
- 支持桌面端优先
- 移动端可基本可用
- 界面简单，步骤不超过 3 步

### 6.4 可维护性
- 前后端分离
- API 封装清晰
- 后续便于扩展登录、支付、批量处理

## 7. 技术方案

### 7.1 技术架构
**前端**
- Next.js
- Tailwind CSS

**部署**
- Cloudflare Pages

**API 层**
- Next.js Route Handlers（优先）或 Cloudflare Functions / Workers

**第三方服务**
- Remove.bg API

### 7.2 系统架构图
```txt
Browser
  ↓
Next.js + Tailwind CSS（Cloudflare Pages）
  ↓
Next.js Route Handlers / Cloudflare Functions
  ↓
Remove.bg API
  ↓
返回 PNG 结果
```

## 8. API 需求

### 8.1 接口：去背景

**路径**
`POST /api/remove-background`

**请求方式**
`multipart/form-data`

**请求参数**
- `file`: 图片文件

**校验规则**
- 必填
- 类型必须为图片
- 大小不超过 10MB

**成功响应**
返回处理后的 PNG 二进制流

或返回：
```json
{
  "success": true,
  "downloadUrl": "/temp/xxx.png"
}
```

> MVP 推荐直接返回图片流，更简单。

**失败响应**
```json
{
  "success": false,
  "error": "Remove background failed"
}
```

## 9. 页面需求

### 9.1 页面列表

**页面 1：首页 / 工具页**
路径建议：
`/`
或
`/tools/image-background-remover`

#### 页面元素
- Logo / 站点标题
- 主标题 H1
- 上传区域
- 处理按钮
- loading 状态
- 结果预览区
- 下载按钮
- 示例效果区
- FAQ

## 10. SEO 需求

### 10.1 核心关键词
- image background remover
- remove background from image
- transparent background maker
- remove image background online

### 10.2 页面 SEO 基础配置
- Title 包含主关键词
- H1 包含主关键词
- Meta description 清晰描述功能
- 图片加 alt
- 页面有实际可用工具，不只是内容页
- URL 简洁

### 10.3 推荐 Title
**Image Background Remover – Remove Background from Images Online**

### 10.4 推荐 Meta Description
**Remove backgrounds from images online in seconds. Upload your photo, erase the background automatically, and download a transparent PNG instantly.**

## 11. 统计与数据埋点

MVP 至少统计以下事件：

- 页面访问量
- 上传按钮点击
- 上传成功
- 去背景请求发起
- 去背景成功
- 下载按钮点击
- 失败次数

目的：
- 看漏斗
- 看 API 成功率
- 看下载转化率

## 12. 验收标准

满足以下条件即视为 MVP 完成：

1. 用户能在首页上传图片
2. 系统能成功调用 Remove.bg API
3. 用户能看到处理结果
4. 用户能下载透明 PNG
5. 不支持格式和超大文件时有明确提示
6. API Key 未暴露到前端
7. 页面可正常部署到 Cloudflare
8. 基本移动端可用
9. 页面具备基础 SEO 信息

## 13. 里程碑建议

### 阶段 1：核心功能打通
- 前端上传
- Worker 转发
- Remove.bg 返回结果
- 下载

### 阶段 2：体验完善
- loading
- 错误提示
- 示例图
- 对比效果

### 阶段 3：上线准备
- SEO
- 限流
- Turnstile
- 埋点

## 14. 后续扩展方向

MVP 验证后，可按优先级扩展：

### P1
- 用户登录
- 免费额度
- 支付订阅
- 下载历史

### P2
- 批量去背景
- 高清导出
- 背景替换
- 图片裁剪/尺寸调整

### P3
- API 产品化
- 多语言
- 程序化 SEO 页面
- B2B 模式

## 15. 一句话版本

**这是一个基于 Next.js + Tailwind CSS、部署在 Cloudflare 上并调用 Remove.bg API 的在线图片去背景工具 MVP，核心目标是以最小成本打通“上传 → 去背景 → 下载”的完整用户流程，并验证 SEO 和转化价值。**

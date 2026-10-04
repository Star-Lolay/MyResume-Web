# 项目简历 · Project-first Resume

一个**纯静态**的个人简历 / 作品集网站，突出「精选项目」。中英双语、明暗主题切换、three.js 动态背景、GSAP 滚动动效。构建产物可直接部署到 GitHub Pages / Cloudflare Pages 或任何静态托管。

## 技术栈

React 19 · TypeScript · Vite · Tailwind CSS · GSAP(ScrollTrigger) · three.js（懒加载）

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 本地开发，http://localhost:3000
npm run build    # 构建静态产物到 dist/
npm run preview  # 本地预览构建产物
```

## ✏️ 自定义指南（只需要改这些）

| 想改什么 | 改哪里 |
| --- | --- |
| **全部文字内容**（个人信息、项目、简历、技能、界面文案） | `src/data/resume.ts` —— 唯一内容配置文件，每个字段都有中文注释 |
| 项目封面 / 头像图片 | 换成网络图片 URL，或把图片放进 `public/images/` 后写 `./images/xxx.jpg` |
| 浏览器标签页标题、SEO 描述 | `index.html` |
| 配色（暖白 / 炭黑 / 青绿点缀，明暗两套） | `src/index.css` 顶部的 CSS 变量（`--bg-warm-white`、`--accent-teal` 等） |
| 右栏顶部装饰图 | `src/components/RightColumn.tsx` 顶部的 `RAIL_IMAGE` |
| 字体 | `index.html` 的 Google Fonts 链接 + `src/index.css` 的 `.font-display` / `.font-label` |

其他可改但通常不用动的部分：

- `src/App.tsx` —— 三栏布局外壳与路由
- `src/components/ShaderCanvas.tsx` —— 左栏 three.js 动态背景（想换效果改片元着色器）
- `src/components/ProjectDetail.tsx` —— 项目详情页版式
- 响应式断点在 `src/index.css` 的 `@media (max-width: 1023px)`：移动端自动变为单栏（关于我 → 项目 → 简历）

> 项目顺序即页面展示顺序，把最想突出的项目放在 `projects` 数组最前面。

## 🚀 部署

### GitHub Pages

仓库已附带 `.github/workflows/deploy.yml`：push 到 `main` 分支后自动构建并发布。

1. 把代码推到 GitHub 仓库；
2. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**；
3. 推送一次提交触发部署，地址为 `https://<用户名>.github.io/<仓库名>/`。

> 已配置 Vite `base: "./"` + HashRouter，部署在子路径下刷新页面也不会 404，无需额外设置。

### Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**，选择仓库；
2. 构建设置：
   - Framework preset: **Vite**（或 None）
   - Build command: `npm run build`
   - Build output directory: `dist`
3. 保存即自动部署，之后每次 push 自动更新。

### 其他静态托管

`npm run build` 后把 `dist/` 目录整个上传即可（Netlify 拖放、对象存储、Nginx 等通用）。

/* ============================================================
 *  ★★★ 全站唯一内容配置文件 ★★★
 *  你只需要修改这个文件，就能换掉整站内容，无需改动任何组件。
 *
 *  可修改部分一览：
 *  1. profile   —— 姓名 / 头衔 / 头像 / 邮箱 / 社交链接 / 个人简介
 *  2. projects  —— 精选项目（中栏大图卡片 + 项目详情页）
 *  3. cvEntries —— 右栏简历轨（教育 / 工作 / 奖项……分类可自定义）
 *  4. skills    —— 右栏技能标签分组
 *  5. uiText    —— 界面上的固定文案（中英双语）
 *
 *  约定：
 *  - 所有 { zh, en } 字段表示中英文文案，网页右上角可切换语言
 *  - 图片可以是网络图片 URL，也可以把图片放进 public/images/ 后
 *    写成 "./images/xxx.jpg"（注意以 ./ 开头，兼容 GitHub Pages 子路径）
 *  - 项目顺序 = 页面展示顺序，把最重要的项目放最前面
 * ============================================================ */

export interface Metric {
  value: string;
  label: { zh: string; en: string };
}

export interface ProjectLink {
  label: { zh: string; en: string };
  url: string;
}

export interface Project {
  id: string; // 详情页路径，如 /project/pulseboard，只用小写字母和连字符
  year: string;
  title: { zh: string; en: string };
  subtitle: { zh: string; en: string };
  role: { zh: string; en: string };
  cover: string; // 封面图（建议 1600×1000 左右横图）
  tags: string[]; // 技术栈 / 关键词标签
  metrics: Metric[]; // 卡片上高亮的数据，建议 2~3 个
  summary: { zh: string; en: string }; // 卡片摘要（1~2 句）
  detail: { zh: string[]; en: string[] }; // 详情页正文，每个元素是一段
  highlights: { zh: string[]; en: string[] }; // 详情页「我做了什么」列表
  links: ProjectLink[]; // 详情页外链（线上地址 / GitHub / 文章……）
}

export interface CvEntry {
  category: string; // 分组名，配合下方 cvCategoryOrder 使用
  title: { zh: string; en: string };
  subtitle?: { zh: string; en: string };
  year: string;
}

export interface SkillGroup {
  group: { zh: string; en: string };
  items: string[];
}

/* ------------------------------------------------------------
 * 1. 个人信息（左栏 + 页头）
 * ---------------------------------------------------------- */
export const profile = {
  name: { zh: "林一舟", en: "Yizhou Lin" },
  headline: {
    zh: "全栈工程师 · 专注数据产品与开发者工具",
    en: "Full-stack Engineer · Data Products & DevTools",
  },
  location: { zh: "杭州 · 可远程", en: "Hangzhou · Remote-friendly" },
  email: "hello@yizhoulin.dev",
  // 不想展示的链接把对应行删除即可
  socials: [
    { label: "GitHub", url: "https://github.com/yourname" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
    { label: "X / Twitter", url: "https://x.com/yourname" },
    { label: "博客", url: "https://yourname.dev" },
  ],
  // 头像：建议正方形。换成自己的照片时，把文件放进 public/images/ 再改这里
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
  bio: {
    zh: "7 年全栈经验，做过日均千万级请求的电商中台，也独立发布过 3 款用户过万的工具产品。擅长把模糊的业务问题拆成可交付的技术方案，最享受的时刻是看到自己写的系统被真实地使用。目前在探索 AI 原生应用与实时数据可视化的交叉地带。相信好的工程师首先是好的产品观察者。",
    en: "7 years of full-stack experience — from e-commerce platforms serving tens of millions of daily requests to three independently shipped tools with 10k+ users each. I turn ambiguous business problems into shippable technical plans, and my favourite moment is watching real people use the systems I built. Currently exploring the intersection of AI-native apps and real-time data visualisation.",
  },
  // 求职状态条（显示在左栏底部），不需要可改为 null
  status: {
    zh: "● 2026 Q1 起开放新机会",
    en: "● Open to opportunities from Q1 2026",
  } as { zh: string; en: string } | null,
};

/* ------------------------------------------------------------
 * 2. 精选项目（中栏，顺序即展示顺序）
 *    封面图当前来自 Unsplash，替换时改成自己的截图即可
 * ---------------------------------------------------------- */
export const projects: Project[] = [
  {
    id: "pulseboard",
    year: "2025",
    title: { zh: "Pulseboard 实时观测平台", en: "Pulseboard — Real-time Observability" },
    subtitle: {
      zh: "为中小团队打造的低开销实时指标看板：一条 SQL 生成可共享的流式仪表盘",
      en: "Low-overhead live metrics boards for small teams — one SQL query becomes a shareable streaming dashboard",
    },
    role: { zh: "独立开发者（设计 + 前后端）", en: "Indie Maker (Design + Full-stack)" },
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
    tags: ["React", "TypeScript", "WebSocket", "D3.js", "ClickHouse"],
    metrics: [
      { value: "12k+", label: { zh: "注册用户", en: "Registered users" } },
      { value: "<200ms", label: { zh: "端到端延迟", en: "End-to-end latency" } },
      { value: "99.95%", label: { zh: "年度可用性", en: "Yearly uptime" } },
    ],
    summary: {
      zh: "从一次内部痛点出发的独立产品：让非数据团队也能用一条 SQL 搭出实时大屏。",
      en: "An indie product born from an internal pain point: real-time dashboards from a single SQL query, no data team required.",
    },
    detail: {
      zh: [
        "团队原先依赖一套重型 BI 方案：配置一个看板要跨三个系统，改一个口径要等数据团队排期。我花两个周末做了最小原型——把 SQL 查询结果直接通过 WebSocket 推到浏览器端的 D3 图层，同事们当天就用上了。",
        "原型转正后，核心挑战是成本：小团队付不起每条看板一条常驻连接。我设计了「查询合并 + 增量推送」的调度层，相同时间窗口的查询共享一次数据库扫描，单机支撑了 4000+ 并发订阅，服务器成本只有原方案的 1/6。",
        "前端上最花心思的是「一眼可读」：所有图表默认关闭动画、保留数值残影，滚动时图表以视口为单位懒加载渲染。这套取舍后来被两个开源项目借鉴。",
      ],
      en: [
        "The team relied on a heavyweight BI stack: building one board meant touching three systems, and a metric tweak waited on the data team's backlog. I built a minimal prototype over two weekends — streaming SQL results over WebSocket straight into a D3 layer in the browser. Colleagues adopted it the same day.",
        "Going from prototype to product, the core challenge was cost: small teams can't afford one persistent connection per board. I designed a scheduler with query coalescing and delta push — queries sharing a time window share a single database scan. One node served 4,000+ concurrent subscriptions at 1/6 of the original server cost.",
        "The frontend obsession was glanceability: animations off by default, value trails preserved, charts lazy-rendered per viewport. These trade-offs were later borrowed by two open-source projects.",
      ],
    },
    highlights: {
      zh: [
        "设计并实现查询合并调度层，单机支撑 4000+ 并发订阅",
        "编写流式 D3 渲染管线，支持断线重连与数据回放",
        "独立完成品牌、落地页与文档站，冷启动 3 个月获客 12k",
      ],
      en: [
        "Designed the query-coalescing scheduler serving 4,000+ concurrent subscriptions per node",
        "Built a streaming D3 pipeline with reconnection and data replay",
        "Shipped brand, landing page and docs solo — 12k users in the first 3 months",
      ],
    },
    links: [
      { label: { zh: "线上 Demo", en: "Live Demo" }, url: "https://example.com" },
      { label: { zh: "GitHub", en: "GitHub" }, url: "https://github.com/yourname/pulseboard" },
    ],
  },
  {
    id: "mindmesh",
    year: "2024",
    title: { zh: "MindMesh AI 笔记", en: "MindMesh AI Notes" },
    subtitle: {
      zh: "以语义搜索为核心的 AI 原生笔记：写下的每一句都会自动织入知识网络",
      en: "AI-native notes built around semantic search — every sentence weaves itself into your knowledge graph",
    },
    role: { zh: "独立开发者", en: "Indie Maker" },
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80&auto=format&fit=crop",
    tags: ["Next.js", "pgvector", "LLM", "tRPC", "Tailwind"],
    metrics: [
      { value: "+34%", label: { zh: "检索命中率提升", en: "Search hit-rate lift" } },
      { value: "8,600", label: { zh: "月活用户", en: "Monthly active users" } },
      { value: "4.8/5", label: { zh: "用户评分", en: "User rating" } },
    ],
    summary: {
      zh: "不依赖文件夹和标签的笔记：按「意思」而不是「关键词」找回你写过的东西。",
      en: "Notes without folders or tags — find what you wrote by meaning, not keywords.",
    },
    detail: {
      zh: [
        "传统笔记的整理成本随规模线性增长，而人的记忆是网状的。MindMesh 在写入时即生成嵌入向量并建立双向链接，搜索走「向量召回 + 关键词精排」的混合管线，比纯向量方案命中率提升 34%。",
        "AI 功能坚持「默认安静」：自动摘要和关联推荐折叠在侧栏，只有用户主动展开才消耗调用量。这个克制让月均推理成本压到了每用户 $0.04。",
      ],
      en: [
        "Traditional note-taking costs grow linearly with scale, while human memory is a graph. MindMesh embeds every note at write time and builds bidirectional links; search runs a hybrid pipeline (vector recall + keyword re-rank), lifting hit rate by 34% over pure-vector baselines.",
        "AI features stay quiet by default: summaries and related-note suggestions live collapsed in the sidebar, consuming tokens only when expanded. That restraint keeps average inference cost at $0.04 per user per month.",
      ],
    },
    highlights: {
      zh: [
        "实现向量召回 + BM25 精排的混合检索管线",
        "设计离线优先的本地缓存层，弱网可用",
        "用提示词缓存把人均推理成本压到 $0.04/月",
      ],
      en: [
        "Built a hybrid retrieval pipeline: vector recall + BM25 re-ranking",
        "Designed an offline-first local cache layer that works on flaky networks",
        "Cut per-user inference cost to $0.04/month with prompt caching",
      ],
    },
    links: [
      { label: { zh: "线上 Demo", en: "Live Demo" }, url: "https://example.com" },
    ],
  },
  {
    id: "shopstack",
    year: "2023 — 2024",
    title: { zh: "ShopStack 电商交易中台", en: "ShopStack Commerce Platform" },
    subtitle: {
      zh: "支撑年 GMV 2.4 亿的交易系统重构：从单体到 23 个服务的平滑迁移",
      en: "Re-architecting a ¥240M-GMV commerce system: a zero-downtime journey from monolith to 23 services",
    },
    role: { zh: "前端负责人 / 架构组成员", en: "Frontend Lead / Architecture Group" },
    cover:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&auto=format&fit=crop",
    tags: ["React", "Node.js", "MySQL", "Redis", "Kubernetes"],
    metrics: [
      { value: "¥2.4亿", label: { zh: "年 GMV 支撑", en: "Yearly GMV served" } },
      { value: "82k", label: { zh: "大促峰值 QPS", en: "Peak QPS on sales events" } },
      { value: "-41%", label: { zh: "首屏耗时下降", en: "First-paint time cut" } },
    ],
    summary: {
      zh: "带领 4 人前端小组完成交易前台重构，大促零事故。",
      en: "Led a 4-person frontend team through the storefront re-architecture — zero incidents during peak sales.",
    },
    detail: {
      zh: [
        "接手时前台是一个五年历史的后端渲染单体，一次改价要全站发布。我们把迁移拆成「绞杀者模式」的 12 个阶段：先用边缘网关按路径分流，新页面逐个接管流量，老系统逐步退场，全程用户无感。",
        "性能上做了三件大事：路由级代码分割、接口聚合的 BFF 层、以及把商品详情页的关键渲染路径压进 14KB 的静态外壳。首屏耗时下降 41%，大促峰值 82k QPS 下 P99 保持在 800ms 内。",
        "作为前端负责人，我同时建立了组件契约评审和灰度发布流程，把前端线上事故率降到上一年的 1/3。",
      ],
      en: [
        "The storefront was a five-year-old server-rendered monolith where a price change meant a full deploy. We split the migration into 12 strangler-fig stages: an edge gateway routed by path, new pages took over traffic one by one, and the legacy system faded out — invisible to users.",
        "Three performance wins: route-level code splitting, a BFF layer for API aggregation, and squeezing the product page's critical rendering path into a 14KB static shell. First paint dropped 41%; P99 stayed under 800ms at 82k peak QPS.",
        "As frontend lead I also introduced component-contract reviews and canary releases, cutting frontend incidents to a third of the previous year.",
      ],
    },
    highlights: {
      zh: [
        "设计 12 阶段绞杀者迁移方案，重构全程零停机",
        "搭建 BFF 聚合层与灰度发布体系",
        "主导性能专项：首屏 -41%，P99 < 800ms",
      ],
      en: [
        "Designed the 12-stage strangler-fig migration with zero downtime",
        "Built the BFF aggregation layer and canary release pipeline",
        "Led the performance push: -41% first paint, P99 < 800ms",
      ],
    },
    links: [
      { label: { zh: "技术复盘文章", en: "Engineering write-up" }, url: "https://example.com" },
    ],
  },
  {
    id: "trailcam",
    year: "2023",
    title: { zh: "TrailCam 开源野外相机", en: "TrailCam — Open-source Wildlife Camera" },
    subtitle: {
      zh: "百元级太阳能野生动物监测相机：Rust 固件 + LoRa 回传 + 网页管理台",
      en: "A sub-$20 solar wildlife camera: Rust firmware, LoRa backhaul, and a web console",
    },
    role: { zh: "核心维护者", en: "Core Maintainer" },
    cover:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80&auto=format&fit=crop",
    tags: ["Rust", "Embedded", "LoRa", "Astro", "开源硬件"],
    metrics: [
      { value: "2.3k", label: { zh: "GitHub Stars", en: "GitHub stars" } },
      { value: "37", label: { zh: "社区贡献者", en: "Contributors" } },
      { value: "14", label: { zh: "部署国家", en: "Countries deployed" } },
    ],
    summary: {
      zh: "和一个自然保护组织合作的开源硬件项目，让保护区用 1/20 的价格部署监测网络。",
      en: "An open-hardware project with a conservation NGO — monitoring networks at 1/20 of the commercial price.",
    },
    detail: {
      zh: [
        "商用红外相机动辄数千元，保护区的预算撑不起密度。我们基于 ESP32 + 热释电传感器做了开源方案，BOM 成本压到百元级，太阳能供电下一次部署可运行 8 个月。",
        "我负责固件（Rust/no_std）和网页管理台。最有意思的难题是 LoRa 窄带下的图片回传：把照片切成渐进式片段，先传缩略轮廓，护林员确认有价值再补传高清部分。",
      ],
      en: [
        "Commercial infrared cameras cost thousands; reserve budgets can't afford density. Our open design pairs an ESP32 with a PIR sensor at a ~¥100 BOM, running 8 months per solar deployment.",
        "I own the firmware (Rust/no_std) and the web console. The most interesting constraint was photo backhaul over LoRa's narrow band: images are split into progressive chunks — a rough preview first, high-res chunks only after a ranger confirms it's worth the airtime.",
      ],
    },
    highlights: {
      zh: [
        "编写 Rust 固件与渐进式图像回传协议",
        "设计 3D 打印外壳与太阳能供电方案",
        "搭建文档站并运营 37 人贡献者社区",
      ],
      en: [
        "Wrote the Rust firmware and progressive image-backhaul protocol",
        "Designed the 3D-printed enclosure and solar power budget",
        "Built the docs site and grew a 37-contributor community",
      ],
    },
    links: [
      { label: { zh: "GitHub", en: "GitHub" }, url: "https://github.com/yourname/trailcam" },
    ],
  },
  {
    id: "typeflow",
    year: "2022",
    title: { zh: "TypeFlow 中文排版引擎", en: "TypeFlow — CJK Web Typesetting Engine" },
    subtitle: {
      zh: "一个 NPM 包解决中文网页排版的「最后一公里」：避头尾、标点挤压与纵向排版",
      en: "One NPM package for the last mile of CJK web typesetting: kinsoku, punctuation squeeze, vertical text",
    },
    role: { zh: "独立开发者", en: "Indie Maker" },
    cover:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80&auto=format&fit=crop",
    tags: ["TypeScript", "CSS", "NPM", "零依赖"],
    metrics: [
      { value: "18k", label: { zh: "周下载量", en: "Weekly downloads" } },
      { value: "0", label: { zh: "运行时依赖", en: "Runtime dependencies" } },
      { value: "3.2kb", label: { zh: "Gzip 体积", en: "Gzipped size" } },
    ],
    summary: {
      zh: "把《中文排版需求》里几十条规则做成开箱即用的 Web 组件。",
      en: "Decades of CJK typesetting rules from CLReq, packaged as drop-in web components.",
    },
    detail: {
      zh: [
        "中文网页的标点悬挂、避头尾长期靠各站点的私有脚本解决。TypeFlow 把规则引擎和渲染层分离：规则查表，渲染纯 CSS，运行时零依赖，gzip 后 3.2kb。",
        "发布后被三家内容平台采用，也让我深入读完了 W3C《中文排版需求》全文——做工具是最好的精读方式。",
      ],
      en: [
        "Hanging punctuation and kinsoku on the Chinese web were long solved by private per-site scripts. TypeFlow separates the rule engine from the renderer: rules via lookup tables, rendering in pure CSS — zero runtime dependencies, 3.2kb gzipped.",
        "It has since been adopted by three content platforms, and it made me read the W3C CLReq cover to cover — building a tool is the best close-reading exercise.",
      ],
    },
    highlights: {
      zh: [
        "实现避头尾 / 标点挤压 / 纵向排版规则引擎",
        "被 3 家内容平台生产环境采用",
        "撰写 20 篇排版规则的交互式文档",
      ],
      en: [
        "Implemented the kinsoku / punctuation-squeeze / vertical-text rule engine",
        "Adopted in production by three content platforms",
        "Wrote 20 interactive docs entries on typesetting rules",
      ],
    },
    links: [
      { label: { zh: "NPM", en: "NPM" }, url: "https://example.com" },
      { label: { zh: "GitHub", en: "GitHub" }, url: "https://github.com/yourname/typeflow" },
    ],
  },
];

/* ------------------------------------------------------------
 * 3. 简历轨（右栏）：category 决定分组，顺序按 cvCategoryOrder
 * ---------------------------------------------------------- */
export const cvCategoryOrder = ["Experience", "Education", "Awards", "Talks"];

export const cvCategoryLabel: Record<string, { zh: string; en: string }> = {
  Experience: { zh: "工作经历", en: "Experience" },
  Education: { zh: "教育背景", en: "Education" },
  Awards: { zh: "奖项荣誉", en: "Awards" },
  Talks: { zh: "分享与演讲", en: "Talks" },
};

export const cvEntries: CvEntry[] = [
  {
    category: "Experience",
    title: { zh: "云脉科技 · 高级前端工程师", en: "CloudPulse · Senior Frontend Engineer" },
    subtitle: { zh: "交易中台前端负责人", en: "Frontend lead, commerce platform" },
    year: "2021 — 至今",
  },
  {
    category: "Experience",
    title: { zh: "拾光科技 · 全栈工程师", en: "Lumina Tech · Full-stack Engineer" },
    subtitle: { zh: "创始团队第 6 号员工", en: "6th employee, founding team" },
    year: "2020 — 2021",
  },
  {
    category: "Education",
    title: { zh: "浙江大学 · 计算机科学与技术", en: "Zhejiang University · Computer Science" },
    subtitle: { zh: "工学学士", en: "B.Eng" },
    year: "2016 — 2020",
  },
  {
    category: "Awards",
    title: { zh: "开源社区年度贡献者", en: "Open-source Contributor of the Year" },
    subtitle: { zh: "SegmentFault 思否", en: "SegmentFault" },
    year: "2024",
  },
  {
    category: "Awards",
    title: { zh: "全国大学生信息安全竞赛 · 一等奖", en: "National InfoSec Contest · First Prize" },
    year: "2019",
  },
  {
    category: "Talks",
    title: { zh: "《从单体到 23 个服务》", en: "“From Monolith to 23 Services”" },
    subtitle: { zh: "前端早早聊大会", en: "Frontend ZaozaoLiao Conf" },
    year: "2024",
  },
  {
    category: "Talks",
    title: { zh: "《把排版规则写成代码》", en: "“Typesetting Rules as Code”" },
    subtitle: { zh: "JSConf China 闪电演讲", en: "JSConf China Lightning Talk" },
    year: "2023",
  },
];

/* ------------------------------------------------------------
 * 4. 技能标签（右栏底部，分组可增删）
 * ---------------------------------------------------------- */
export const skills: SkillGroup[] = [
  {
    group: { zh: "语言", en: "Languages" },
    items: ["TypeScript", "JavaScript", "Rust", "Python", "SQL"],
  },
  {
    group: { zh: "前端", en: "Frontend" },
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "D3.js", "Three.js", "GSAP"],
  },
  {
    group: { zh: "后端与基础设施", en: "Backend & Infra" },
    items: ["Node.js", "PostgreSQL", "Redis", "ClickHouse", "Docker", "Kubernetes", "Cloudflare Workers"],
  },
];

/* ------------------------------------------------------------
 * 5. 界面固定文案（一般不用改）
 * ---------------------------------------------------------- */
export const uiText = {
  projectsTitle: { zh: "精选项目", en: "Selected Projects" },
  profileTitle: { zh: "关于我", en: "Profile" },
  contactTitle: { zh: "联系我", en: "Contact" },
  skillsTitle: { zh: "技能栈", en: "Skills" },
  viewProject: { zh: "查看项目", en: "View Project" },
  backHome: { zh: "返回首页", en: "Back to home" },
  highlightsTitle: { zh: "我做了什么", en: "What I did" },
  stackTitle: { zh: "技术栈", en: "Stack" },
  linksTitle: { zh: "相关链接", en: "Links" },
  notFound: { zh: "页面不存在", en: "Page not found" },
  prevProject: { zh: "上一个项目", en: "Previous" },
  nextProject: { zh: "下一个项目", en: "Next" },
  footer: {
    zh: "用 React + Vite 构建 · 内容集中在 src/data/resume.ts",
    en: "Built with React + Vite · All content lives in src/data/resume.ts",
  },
};

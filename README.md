<p align="center">
  <a href="https://github.com/Ali1995A/chinese-poetry">
    <img src="https://avatars3.githubusercontent.com/u/30764933?s=200&v=4" alt="chinese-poetry" width="100">
  </a>
</p>

<h1 align="center">诗云 Poetry Cloud</h1>

<p align="center">
  <strong>现代化的中国古典诗词阅读与探索平台</strong>
</p>

<p align="center">
  <a href="https://github.com/Ali1995A/chinese-poetry/blob/master/LICENSE">
    <img alt="License" src="http://img.shields.io/badge/license-mit-blue.svg?style=for-the-badge" style="max-width:100%;">
  </a>
  <a href="https://nextjs.org">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js" style="max-width:100%;">
  </a>
  <a href="https://tailwindcss.com">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css" style="max-width:100%;">
  </a>
  <a href="https://supabase.com">
    <img alt="Supabase" src="https://img.shields.io/badge/Supabase-2.39-3ECF8E?style=for-the-badge&logo=supabase" style="max-width:100%;">
  </a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/jackeygao/chinese-poetry/master/images/full-tang-poetry.png" alt="诗云网站预览" width="800">
</p>

## 🌟 项目简介

**诗云 (Poetry Cloud)** 是一个基于现代 Web 技术构建的中国古典诗词阅读与探索平台。我们致力于将传统诗词文化与现代用户体验完美结合，为用户提供沉浸式的诗词阅读体验。

### ✨ 核心特色

- **🎨 现代化设计** - 融合水墨丹青美学与现代UI设计
- **📚 海量诗词库** - 基于最全中文诗歌古典文集数据库
- **🔍 智能搜索** - 支持诗词、作者、朝代、关键词搜索
- **📱 响应式设计** - 完美适配桌面端和移动端
- **⚡ 高性能** - 基于 Next.js 14 App Router 构建
- **🔐 用户系统** - 完整的注册登录和个性化功能
- **📊 数据分析** - 集成 Google Analytics 4 用户行为追踪

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn
- Supabase 账户（用于数据库）

### 安装与运行

1. **克隆项目**
```bash
git clone https://github.com/Ali1995A/chinese-poetry.git
cd chinese-poetry
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **环境配置**
创建 `.env.local` 文件并配置 Supabase 连接信息：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **运行开发服务器**
```bash
npm run dev
# 或
yarn dev
```

5. **访问应用**
打开浏览器访问 `http://localhost:3000`

## 📖 功能特性

### 🏠 首页
- **每日推荐** - 基于日期的稳定随机推荐算法
- **分类导航** - 唐诗、宋词、元曲等朝代分类
- **每日一言** - 经典诗词名言每日更新
- **智能搜索** - 全局搜索诗词和作者

### 📚 诗词文库
- **分页浏览** - 优雅的分页设计，每页24首
- **朝代筛选** - 按唐、宋、元、明、清等朝代筛选
- **搜索功能** - 支持标题和作者搜索
- **响应式网格** - 自适应卡片布局

### 👨‍🎨 历代诗人
- **诗人列表** - 按作品数量排序的诗人目录
- **实时搜索** - 客户端搜索过滤
- **作品统计** - 显示每位诗人的收录作品数量
- **快速跳转** - 点击诗人查看其所有作品

### 🎯 精选主题
- **主题策划** - 精心策划的诗词主题集合
- **名家专题** - 李白、杜甫、苏轼、李清照等名家专题
- **朝代专题** - 大唐风华、宋词雅韵等朝代特色
- **视觉设计** - 每个主题都有独特的色彩和图标

### 📖 诗词阅读
- **优雅排版** - 专业的诗词排版和字体设计
- **注释背景** - 详细的注释和创作背景信息
- **导航功能** - 上一首/下一首快速导航
- **收藏功能** - 用户收藏诗词（开发中）

### 🔐 用户系统
- **注册登录** - 完整的用户认证流程
- **邮箱验证** - 注册邮箱验证功能
- **个人中心** - 用户信息管理（开发中）
- **收藏管理** - 个人收藏诗词管理（开发中）

## 🛠 技术栈

### 前端技术
- **Next.js 14** - React 全栈框架，App Router
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 精美的图标库
- **Framer Motion** - 动画库

### 后端服务
- **Supabase** - 开源 Firebase 替代品
- **PostgreSQL** - 关系型数据库
- **Row Level Security** - 行级安全策略

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 处理工具
- **Autoprefixer** - CSS 前缀自动添加

## 🎨 设计理念

### 视觉设计
- **水墨风格** - 融合传统水墨元素与现代设计
- **字体搭配** - 宋体（标题）与细黑（正文）的完美结合
- **色彩系统** - 精心设计的色彩变量和主题系统
- **动效设计** - 流畅的过渡动画和微交互

### 用户体验
- **渐进式加载** - 优化的加载体验和骨架屏
- **响应式交互** - 适配各种设备和交互方式
- **无障碍设计** - 关注可访问性和用户体验
- **性能优化** - 代码分割和图片优化

## 📊 数据来源

本项目基于 [chinese-poetry/chinese-poetry](https://github.com/chinese-poetry/chinese-poetry) 数据集，包含：

- **5.5 万首唐诗**
- **26 万首宋诗** 
- **2.1 万首宋词**
- **其他古典文集**

数据通过 Supabase 数据库进行管理和查询，提供高效的搜索和筛选功能。

## 🔧 开发指南

### 项目结构
```
chinese-poetry/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── poems/             # 诗词文库
│   ├── authors/           # 诗人页面
│   ├── collections/       # 精选主题
│   └── poem/[id]/         # 单首诗词详情
├── components/            # 可复用组件
│   ├── Navigation.tsx     # 导航栏
│   ├── PoemReader.tsx     # 诗词阅读器
│   ├── SearchBar.tsx      # 搜索组件
│   └── CalligraphyStroke.tsx # 水墨装饰
├── contexts/              # React Context
│   └── AuthContext.tsx    # 用户认证上下文
├── lib/                   # 工具函数
├── utils/                 # 工具类
└── types/                 # TypeScript 类型定义
```

### 数据导入
项目包含数据导入脚本，可将原始 JSON 数据导入到 Supabase 数据库：

```bash
# 运行数据导入脚本
npm run data-import
```

### 自定义开发
要添加新功能或修改现有功能：

1. 在 `app/` 目录下创建新页面
2. 在 `components/` 目录下创建可复用组件
3. 在 `lib/` 或 `utils/` 中添加工具函数
4. 更新 TypeScript 类型定义

## 🤝 贡献指南

我们欢迎各种形式的贡献！你可以通过以下方式参与：

1. **报告问题** - 在 Issues 中报告 bug 或提出建议
2. **提交代码** - 通过 Pull Request 提交功能改进
3. **完善文档** - 改进项目文档和说明
4. **分享想法** - 参与功能讨论和设计建议

### 开发流程
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

### MIT 许可证的主要限制：

- **署名要求** - 必须在所有副本或重要部分中包含原始版权声明和许可声明
- **无担保** - 软件按"原样"提供，不提供任何明示或暗示的担保
- **责任限制** - 作者或版权持有人不对因软件或使用或其他方式产生的任何索赔、损害或其他责任负责

### 允许的行为：
- ✅ 商业使用
- ✅ 修改
- ✅ 分发
- ✅ 私人使用
- ✅ 子授权

### 禁止的行为：
- ❌ 无署名使用
- ❌ 责任追究

MIT 许可证是一个非常宽松的开源许可证，允许用户几乎无限制地使用、修改和分发软件。

## 🙏 致谢

- 感谢 [chinese-poetry](https://github.com/chinese-poetry/chinese-poetry) 项目提供的数据集
- 感谢所有贡献者和用户的支持
- 感谢开源社区提供的优秀工具和库

## 📧 联系我们

如有建议或吐槽，欢迎联系我的邮箱：liexpress@163.com

---

<p align="center">
  让每一次阅读都成为一场心灵的修行 ✨
</p>

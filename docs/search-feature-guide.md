# 诗词搜索功能优化说明

## 概述

本次优化对诗词网站的搜索功能进行了全面升级，提供了更智能、更便捷的搜索体验。

## 主要改进功能

### 1. 专门的搜索页面
- **路径**: `/search`
- 独立的搜索界面，专注于搜索体验
- 支持搜索历史、热门搜索展示
- 响应式设计，适配各种设备

### 2. 全文搜索支持
- **搜索范围**: 标题、作者、内容、标签
- **智能匹配**: 根据匹配类型显示不同权重
  - 标题匹配 (100分)
  - 作者匹配 (80分)
  - 标签匹配 (50分)
  - 内容匹配 (40分)

### 3. 搜索建议和自动完成
- **实时建议**: 输入时实时显示相关建议
- **分类建议**: 诗词标题、作者、标签分类显示
- **图标标识**: 不同类型建议使用不同图标和颜色

### 4. 高级筛选功能
- **朝代筛选**: 唐、宋、元、明、清、五代
- **排序选项**: 相关度、标题、作者、朝代
- **移动端优化**: 可展开/收起的筛选面板

### 5. 搜索历史和热门搜索
- **搜索历史**: 自动保存最近10条搜索记录
- **热门搜索**: 显示最受欢迎的搜索词
- **本地存储**: 使用localStorage保存用户搜索历史

### 6. 移动端优化
- **全屏搜索**: 移动端专用全屏搜索界面
- **触控优化**: 大按钮、易触控的设计
- **快速访问**: 导航栏快速打开搜索

## 技术实现

### 数据库优化
```sql
-- 全文搜索索引
CREATE INDEX idx_poems_title_gin ON poems USING gin(to_tsvector('simple', title));
CREATE INDEX idx_poems_author_gin ON poems USING gin(to_tsvector('simple', author));
CREATE INDEX idx_poems_content_gin ON poems USING gin(to_tsvector('simple', array_to_string(content, ' ')));
CREATE INDEX idx_poems_tags_gin ON poems USING gin(tags);
```

### 搜索工具函数
- `searchPoems()`: 执行搜索，支持筛选和排序
- `getSearchSuggestions()`: 获取搜索建议
- `getPopularSearches()`: 获取热门搜索
- `logSearch()`: 记录搜索日志（可选）

### 组件架构
```
components/
├── SearchBar.tsx          # 通用搜索栏
├── MobileSearch.tsx       # 移动端搜索组件
└── SearchFilters.tsx      # 搜索筛选组件

app/
└── search/
    └── page.tsx           # 搜索页面

utils/
└── search.ts              # 搜索工具函数
```

## 使用方法

### 1. 基本搜索
```typescript
// 在组件中使用搜索
import { searchPoems } from '@/utils/search';

const results = await searchPoems('李白', {
  limit: 50,
  dynasty: '唐',
  sortBy: 'relevance'
});
```

### 2. 获取搜索建议
```typescript
import { getSearchSuggestions } from '@/utils/search';

const suggestions = await getSearchSuggestions('春', 8);
```

### 3. 集成搜索组件
```tsx
// 在页面中使用搜索组件
import SearchBar from '@/components/SearchBar';

function MyPage() {
  return (
    <div>
      <SearchBar placeholder="搜索诗词..." autoFocus />
    </div>
  );
}
```

## 性能优化

### 1. 数据库索引
- 为常用搜索字段创建GIN索引
- 复合索引优化联合查询

### 2. 搜索算法
- 权重评分系统
- 智能排序结果
- 分页支持

### 3. 前端优化
- 防抖搜索建议请求
- 本地缓存热门搜索
- 懒加载搜索结果

## 部署说明

### 1. 数据库优化脚本
执行 `scripts/optimize-search.sql` 来创建搜索相关的数据库索引和函数。

### 2. 环境配置
确保以下环境变量已配置：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 用户体验改进

### 1. 搜索反馈
- 实时显示搜索结果数量
- 加载状态指示器
- 空状态友好提示

### 2. 结果展示
- 匹配类型标识
- 朝代标签
- 作者信息
- 内容预览
- 标签显示

### 3. 交互优化
- 键盘快捷键支持
- 一键清除搜索
- 搜索建议点击跳转

## 扩展功能

### 1. 搜索分析（可选）
- 搜索日志记录
- 热门搜索统计
- 用户搜索行为分析

### 2. 高级搜索
- 布尔搜索支持
- 模糊搜索
- 拼音搜索

### 3. 个性化推荐
- 基于搜索历史的推荐
- 相似诗词推荐
- 热门作者推荐

## 总结

本次搜索功能优化显著提升了用户体验，提供了更智能、更全面的搜索能力。新的搜索系统支持全文搜索、智能建议、高级筛选等功能，为诗词爱好者提供了更好的内容发现体验。
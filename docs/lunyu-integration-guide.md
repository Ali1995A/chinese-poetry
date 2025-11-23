# 论语数据集成指南

## 概述

论语数据已成功集成到诗词系统中，包含20个章节、512个段落，全部转换为标准的诗词格式。

## 数据结构

### 论语数据类型
- [`LunyuChapter`](../types/lunyu.ts:3): 论语章节接口
- [`LunyuPoem`](../types/lunyu.ts:10): 论语段落转换为诗词的接口

### 数据转换
每个论语段落被转换为一个诗词条目：
```typescript
{
  id: "lunyu-1",           // 唯一标识符
  title: "学而篇·第1段",    // 章节和段落号
  author: "孔子及其弟子",    // 作者
  dynasty: "春秋",          // 朝代
  content: ["子曰：“学而时习之，不亦说乎？..."], // 内容
  tags: ["论语", "儒家", "经典", "学而篇"], // 标签
  chapter: "学而篇",        // 原始章节
  paragraphIndex: 0,        // 段落索引
  originalText: "子曰：“学而时习之，不亦说乎？..." // 原始文本
}
```

## 使用方法

### 1. 获取所有论语诗词
```typescript
import { getAllLunyuPoems } from '@/lib/lunyu-service';

const poems = await getAllLunyuPoems();
```

### 2. 搜索论语内容
```typescript
import { searchLunyuPoems } from '@/lib/lunyu-service';

const results = await searchLunyuPoems('子曰');
```

### 3. 获取随机论语
```typescript
import { getRandomLunyuPoem } from '@/lib/lunyu-service';

const randomPoem = await getRandomLunyuPoem();
```

### 4. 获取论语统计
```typescript
import { getLunyuStats } from '@/lib/lunyu-service';

const stats = await getLunyuStats();
```

## 网页搜索

论语数据已集成到网页搜索中，可以通过以下关键词搜索：

- **"子曰"**: 搜索包含"子曰"的段落 (385条结果)
- **"学而"**: 搜索学而篇相关内容 (24条结果)  
- **"论语"**: 搜索所有论语内容 (512条结果)
- **"孔子"**: 搜索提到孔子的段落 (45条结果)

## 集成功能

### 主数据服务
[`lib/data-service.ts`](../lib/data-service.ts) 已更新，支持论语数据：
- [`getAllPoems()`](../lib/data-service.ts:18): 返回所有诗词（包含论语）
- [`getPoemById()`](../lib/data-service.ts:33): 根据ID获取诗词（支持论语ID）
- [`searchPoems()`](../lib/data-service.ts:56): 搜索诗词（包含论语内容）
- [`getRandomPoem()`](../lib/data-service.ts:112): 获取随机诗词（可能返回论语）

### 网页搜索
[`utils/search.ts`](../utils/search.ts) 已更新，在基础搜索中包含论语数据。

## 测试验证

运行以下测试脚本验证集成：

```bash
# 测试论语数据加载
npx tsx scripts/test-lunyu-loading.ts

# 测试网页搜索功能
npx tsx scripts/test-web-search.ts
```

## 数据统计

- **总章节数**: 20
- **总段落数**: 512
- **总诗词数**: 522 (包含原有的10条模拟诗词)
- **搜索覆盖率**: 100% (所有论语内容都可搜索)

## 注意事项

1. **ID格式**: 论语诗词的ID格式为 `lunyu-{数字}`，避免与现有诗词ID冲突
2. **朝代标记**: 所有论语条目标记为"春秋"朝代
3. **作者标记**: 统一标记为"孔子及其弟子"
4. **标签系统**: 每个条目都包含"论语"、"儒家"、"经典"标签

## 扩展建议

如需添加其他经典文献，可参考论语集成模式：
1. 创建对应的数据类型
2. 实现数据加载服务
3. 更新主数据服务
4. 集成到搜索系统
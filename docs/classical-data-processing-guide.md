# 古典文献数据处理标准流程

## 概述
本文档提供了一套标准的古典文献数据处理流程和提示词模板，用于将各种古典文献数据集成到诗词系统中。

## 标准处理流程

### 1. 数据分析和类型定义

**提示词模板：**
```
请分析 [文献名称] 的JSON数据结构，并创建对应的TypeScript类型定义。

JSON数据结构示例：
[粘贴JSON数据结构示例]

要求：
1. 定义原始数据接口 [文献名称]Item
2. 定义转换为诗词格式的接口 [文献名称]Poem
3. 确保与现有的诗词系统兼容
4. 包含必要的字段：id, title, author, dynasty, content, tags等
```

**示例（楚辞）：**
```typescript
// 楚辞数据类型定义
export interface ChuciItem {
  title: string;
  section: string;
  author: string;
  content: string[];
}

export interface ChuciData {
  items: ChuciItem[];
}

// 楚辞条目转换为诗词格式的接口
export interface ChuciPoem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  tags: string[];
  section: string;
  originalText: string;
}
```

### 2. 创建数据服务

**提示词模板：**
```
请为 [文献名称] 数据创建一个数据加载服务，参考现有的论语服务实现模式。

要求：
1. 创建 lib/[文献名称]-service.ts 文件
2. 实现以下核心功能：
   - 数据加载和缓存机制
   - 数据转换为诗词格式
   - 搜索功能（支持标题、内容、作者、标签搜索）
   - 按分类筛选功能
   - 随机诗词获取
   - 统计信息获取
3. 包含作者到朝代的映射逻辑
4. 实现完整的错误处理
```

**核心功能实现要点：**
```typescript
// 数据转换函数
function convertToPoems(): [文献名称]Poem[] {
  // 为每个条目创建诗词格式
}

// 搜索功能
export async function search[文献名称]Poems(query: string) {
  // 实现多字段搜索
}

// 统计信息
export async function get[文献名称]Stats() {
  // 返回数据统计
}
```

### 3. 更新数据服务集成

**提示词模板：**
```
请更新主数据服务以支持 [文献名称] 数据集成。

需要更新的文件：
1. lib/data-service.ts
2. utils/search.ts

更新要求：
1. 在 getAllPoems() 中合并 [文献名称] 数据
2. 在 getPoemById() 中支持 [文献名称] ID查找
3. 在 searchPoems() 中集成 [文献名称] 搜索
4. 在 getRandomPoem() 中随机包含 [文献名称] 数据
5. 在搜索工具中集成 [文献名称] 搜索结果
```

**集成代码示例：**
```typescript
// 在 data-service.ts 中
import { getAll[文献名称]Poems, get[文献名称]PoemById, search[文献名称]Poems, getRandom[文献名称]Poem } from './[文献名称]-service';

// 在搜索工具中
import { search[文献名称]Poems } from '@/lib/[文献名称]-service';
```

### 4. 创建测试脚本

**提示词模板：**
```
请为 [文献名称] 数据创建测试脚本，验证数据加载和集成功能。

测试要求：
1. 测试数据加载功能
2. 测试搜索功能
3. 测试随机诗词获取
4. 测试统计信息
5. 验证系统集成效果
6. 显示示例数据

测试脚本应包含完整的错误处理和详细的输出信息。
```

**测试脚本结构：**
```typescript
async function test[文献名称]Loading() {
  // 1. 测试获取所有诗词
  // 2. 测试随机诗词
  // 3. 测试ID查找
  // 4. 测试搜索功能
  // 5. 测试统计信息
  // 6. 显示示例数据
}
```

## 完整提示词示例

### 处理新文献的完整提示词

```
请按照标准流程处理 [新文献名称] 数据：

1. **分析数据结构**
   - 查看 source_data/[新文献名称]/[数据文件].json
   - 创建 types/[新文献名称].ts 类型定义

2. **创建数据服务**
   - 创建 lib/[新文献名称]-service.ts
   - 实现数据加载、搜索、转换等功能
   - 参考 lib/lunyu-service.ts 的实现模式

3. **系统集成**
   - 更新 lib/data-service.ts 集成新数据
   - 更新 utils/search.ts 支持新数据搜索

4. **测试验证**
   - 创建 scripts/test-[新文献名称]-loading.ts
   - 创建 scripts/test-data-service-with-[新文献名称].ts
   - 运行测试验证功能

请确保：
- 数据格式与现有系统兼容
- 搜索功能正常工作
- 随机诗词包含新数据
- 所有功能经过测试验证
```

## 文件命名规范

- 类型定义：`types/[文献名称].ts`
- 数据服务：`lib/[文献名称]-service.ts`
- 测试脚本：`scripts/test-[文献名称]-loading.ts`
- 集成测试：`scripts/test-data-service-with-[文献名称].ts`

## 注意事项

1. **数据兼容性**：确保新数据的诗词格式与现有系统兼容
2. **搜索集成**：新数据必须能在web搜索中正常显示
3. **错误处理**：所有服务都应包含完整的错误处理
4. **性能优化**：使用缓存机制避免重复加载数据
5. **测试覆盖**：确保所有功能都经过充分测试

## 适用文献类型

此流程适用于：
- 诗经、楚辞、元曲等古典诗歌
- 论语、孟子等儒家经典
- 其他需要转换为诗词格式的古典文献
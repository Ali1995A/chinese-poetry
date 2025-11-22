# 数据摄取脚本

这个目录包含用于将唐诗三百首数据摄取到 Supabase 的脚本。

## 文件说明

- `ingest-tang300.ts` - 主要的数据摄取脚本
- `create-poems-table.sql` - 创建 poems 表的 SQL 命令
- `README.md` - 本说明文件

## 使用步骤

### 1. 安装依赖

首先安装所需的依赖包：

```bash
npm install @supabase/supabase-js dotenv
# 或者如果使用 yarn
yarn add @supabase/supabase-js dotenv
```

### 2. 设置环境变量

复制 `.env.local.example` 到 `.env.local` 并填入你的 Supabase 凭据：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件：
```env
NEXT_PUBLIC_SUPABASE_URL=你的_supabase_项目_url
SUPABASE_SERVICE_ROLE_KEY=你的_supabase_服务角色密钥
```

### 3. 创建数据库表

在 Supabase 的 SQL 编辑器中执行 `create-poems-table.sql` 文件中的 SQL 命令来创建 poems 表。

### 4. 准备源数据

将你的唐诗三百首数据保存为 `source_data/tang300.json` 文件。文件格式应该是一个 JSON 数组，每个对象包含以下字段：

```json
[
  {
    "id": "uuid-string",
    "title": "诗歌标题",
    "author": "作者",
    "paragraphs": ["段落1", "段落2", ...],
    "tags": ["标签1", "标签2"]  // 可选
  }
]
```

参考 `source_data/tang300.example.json` 查看示例格式。

### 5. 运行摄取脚本

使用以下命令运行脚本：

```bash
npx ts-node scripts/ingest-tang300.ts
```

或者如果你有 package.json 脚本配置：

```bash
npm run ingest:tang300
```

## 脚本功能

- ✅ 读取本地 JSON 文件
- ✅ 数据格式转换和清理
- ✅ 批量插入（每批 50 条记录）
- ✅ 错误处理和进度日志
- ✅ 使用 upsert 操作避免重复数据

## 注意事项

1. **服务角色密钥**：确保使用 `SUPABASE_SERVICE_ROLE_KEY` 而不是匿名密钥，因为需要写入权限。
2. **数据格式**：源数据文件必须符合预期的 JSON 格式。
3. **批量处理**：脚本会自动分批处理数据以避免超时。
4. **错误处理**：如果某批数据插入失败，脚本会停止并显示错误信息。

## 故障排除

如果遇到问题：

1. 检查环境变量是否正确设置
2. 确认 Supabase 表已正确创建
3. 验证源数据文件格式
4. 查看控制台输出的错误信息
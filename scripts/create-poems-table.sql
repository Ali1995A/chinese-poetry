-- 创建 poems 表的 SQL 命令
-- 在 Supabase SQL 编辑器中执行此命令

CREATE TABLE IF NOT EXISTS poems (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT[] NOT NULL,
  dynasty TEXT NOT NULL DEFAULT '唐',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 为常用查询字段创建索引
CREATE INDEX IF NOT EXISTS idx_poems_author ON poems(author);
CREATE INDEX IF NOT EXISTS idx_poems_dynasty ON poems(dynasty);
CREATE INDEX IF NOT EXISTS idx_poems_created_at ON poems(created_at);

-- 启用行级安全 (RLS)
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;

-- 创建策略允许所有操作（根据实际需求调整）
-- 对于数据摄取脚本，可能需要暂时禁用 RLS 或创建适当的策略

-- 允许所有人读取
CREATE POLICY "允许所有人读取诗歌" ON poems
  FOR SELECT USING (true);

-- 允许服务角色插入/更新（用于数据摄取）
CREATE POLICY "允许服务角色管理诗歌" ON poems
  FOR ALL USING (auth.role() = 'service_role');

-- 创建 updated_at 自动更新的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_poems_updated_at BEFORE UPDATE
  ON poems FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 注释：
-- 1. id 使用 UUID 作为主键，与源数据中的 UUID 匹配
-- 2. content 字段使用 TEXT[] 数组类型存储诗歌段落
-- 3. dynasty 默认为 '唐'，符合唐诗三百首的需求
-- 4. tags 字段是可选的标签数组
-- 5. 创建了必要的索引以提高查询性能
-- 6. 启用了行级安全并创建了适当的策略
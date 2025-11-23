-- 创建用户资料表的 SQL 命令
-- 在 Supabase SQL 编辑器中执行此命令

-- 用户资料表（扩展 Supabase auth.users）
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  favorite_poems UUID[] DEFAULT '{}',
  reading_history UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 为常用查询字段创建索引
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);

-- 启用行级安全 (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 创建策略
-- 允许用户读取所有公开资料
CREATE POLICY "允许所有人读取用户资料" ON profiles
  FOR SELECT USING (true);

-- 允许用户更新自己的资料
CREATE POLICY "允许用户更新自己的资料" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 允许用户插入自己的资料
CREATE POLICY "允许用户插入自己的资料" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 创建 updated_at 自动更新的触发器
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE
  ON profiles FOR EACH ROW EXECUTE FUNCTION update_profiles_updated_at();

-- 创建用户收藏表
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, poem_id)
);

-- 启用行级安全
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "允许用户管理自己的收藏" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- 创建阅读历史表
CREATE TABLE IF NOT EXISTS reading_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "允许用户管理自己的阅读历史" ON reading_history
  FOR ALL USING (auth.uid() = user_id);

-- 注释：
-- 1. profiles 表扩展了 auth.users，存储用户额外信息
-- 2. user_favorites 表存储用户收藏的诗歌
-- 3. reading_history 表存储用户阅读历史
-- 4. 所有表都启用了行级安全，确保数据安全
-- 5. 用户只能访问和管理自己的数据
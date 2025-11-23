-- 诗词搜索功能优化脚本
-- 在 Supabase SQL 编辑器中执行此命令

-- 1. 为全文搜索创建 GIN 索引
-- 为标题创建索引
CREATE INDEX IF NOT EXISTS idx_poems_title_gin ON poems USING gin(to_tsvector('simple', title));

-- 为作者创建索引  
CREATE INDEX IF NOT EXISTS idx_poems_author_gin ON poems USING gin(to_tsvector('simple', author));

-- 为内容创建索引（将数组转换为文本）
CREATE INDEX IF NOT EXISTS idx_poems_content_gin ON poems USING gin(to_tsvector('simple', array_to_string(content, ' ')));

-- 为标签创建索引
CREATE INDEX IF NOT EXISTS idx_poems_tags_gin ON poems USING gin(tags);

-- 2. 创建复合索引以提高常用查询性能
CREATE INDEX IF NOT EXISTS idx_poems_dynasty_author ON poems(dynasty, author);
CREATE INDEX IF NOT EXISTS idx_poems_author_title ON poems(author, title);

-- 3. 创建搜索辅助函数
CREATE OR REPLACE FUNCTION search_poems(query_text TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  author TEXT,
  dynasty TEXT,
  content TEXT[],
  tags TEXT[],
  match_type TEXT,
  match_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  WITH ranked_results AS (
    -- 标题匹配（最高权重）
    SELECT 
      p.id,
      p.title,
      p.author,
      p.dynasty,
      p.content,
      p.tags,
      'title' as match_type,
      CASE 
        WHEN p.title ILIKE '%' || query_text || '%' THEN 100
        ELSE 80
      END as match_score
    FROM poems p
    WHERE p.title ILIKE '%' || query_text || '%'
    
    UNION ALL
    
    -- 作者匹配（中等权重）
    SELECT 
      p.id,
      p.title,
      p.author,
      p.dynasty,
      p.content,
      p.tags,
      'author' as match_type,
      60 as match_score
    FROM poems p
    WHERE p.author ILIKE '%' || query_text || '%'
    
    UNION ALL
    
    -- 内容匹配（较低权重）
    SELECT 
      p.id,
      p.title,
      p.author,
      p.dynasty,
      p.content,
      p.tags,
      'content' as match_type,
      40 as match_score
    FROM poems p
    WHERE EXISTS (
      SELECT 1 
      FROM unnest(p.content) as line 
      WHERE line ILIKE '%' || query_text || '%'
    )
    
    UNION ALL
    
    -- 标签匹配（中等权重）
    SELECT 
      p.id,
      p.title,
      p.author,
      p.dynasty,
      p.content,
      p.tags,
      'tag' as match_type,
      50 as match_score
    FROM poems p
    WHERE p.tags IS NOT NULL AND query_text = ANY(p.tags)
  )
  SELECT DISTINCT ON (id)
    id,
    title,
    author,
    dynasty,
    content,
    tags,
    match_type,
    match_score
  FROM ranked_results
  ORDER BY id, match_score DESC;
END;
$$ LANGUAGE plpgsql;

-- 4. 创建获取搜索建议的函数
CREATE OR REPLACE FUNCTION get_search_suggestions(query_text TEXT, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  type TEXT,
  text TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH suggestions AS (
    -- 诗词标题建议
    SELECT 
      'poem' as type,
      p.title as text,
      COUNT(*) as count
    FROM poems p
    WHERE p.title ILIKE '%' || query_text || '%'
    GROUP BY p.title
    
    UNION ALL
    
    -- 作者建议
    SELECT 
      'author' as type,
      p.author as text,
      COUNT(*) as count
    FROM poems p
    WHERE p.author ILIKE '%' || query_text || '%'
    GROUP BY p.author
    
    UNION ALL
    
    -- 标签建议
    SELECT 
      'tag' as type,
      tag as text,
      COUNT(*) as count
    FROM poems p, unnest(p.tags) as tag
    WHERE tag ILIKE '%' || query_text || '%'
    GROUP BY tag
  )
  SELECT 
    type,
    text,
    count
  FROM suggestions
  ORDER BY count DESC, text
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- 5. 创建获取热门搜索的函数
CREATE OR REPLACE FUNCTION get_popular_searches(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  search_term TEXT,
  search_count BIGINT
) AS $$
BEGIN
  -- 这里可以连接到实际的搜索日志表
  -- 暂时返回静态的热门搜索数据
  RETURN QUERY
  SELECT 
    term::TEXT as search_term,
    count::BIGINT as search_count
  FROM (VALUES
    ('李白', 1280),
    ('春江花月夜', 890),
    ('相思', 760),
    ('苏轼', 650),
    ('静夜思', 540),
    ('杜甫', 520),
    ('水调歌头', 480),
    ('登高', 420),
    ('白居易', 380),
    ('王维', 350)
  ) as popular(term, count)
  ORDER BY count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- 6. 注释说明
COMMENT ON FUNCTION search_poems(TEXT) IS '搜索诗词，返回匹配结果和评分';
COMMENT ON FUNCTION get_search_suggestions(TEXT, INTEGER) IS '获取搜索建议';
COMMENT ON FUNCTION get_popular_searches(INTEGER) IS '获取热门搜索词';

-- 7. 创建搜索日志表（可选，用于分析搜索行为）
CREATE TABLE IF NOT EXISTS search_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  results_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 为搜索日志创建索引
CREATE INDEX IF NOT EXISTS idx_search_logs_query ON search_logs(query);
CREATE INDEX IF NOT EXISTS idx_search_logs_created_at ON search_logs(created_at);

-- 启用行级安全
ALTER TABLE search_logs ENABLE ROW LEVEL SECURITY;

-- 创建策略允许所有人插入搜索日志
CREATE POLICY "允许所有人记录搜索" ON search_logs
  FOR INSERT USING (true);

-- 创建策略只允许用户查看自己的搜索历史
CREATE POLICY "允许用户查看自己的搜索历史" ON search_logs
  FOR SELECT USING (auth.uid() = user_id);
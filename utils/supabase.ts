import { createClient } from '@supabase/supabase-js';

// 创建一个单一的 Supabase 客户端实例
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 注意：在前端使用时，最好使用 anon key。
// 如果你没有在 .env.local 设置 NEXT_PUBLIC_SUPABASE_ANON_KEY，
// 暂时用 Service Role Key 也能跑（但在生产环境不安全，仅限本地学习）。
export const supabase = createClient(supabaseUrl, supabaseKey);
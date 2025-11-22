import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// 1. 加载环境变量
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error('❌ 找不到 .env.local');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 2. 设置目录: source_data/全唐诗
const TANG_DIR = path.join(process.cwd(), 'source_data', '全唐诗');

interface TangPoem {
  author: string;
  paragraphs: string[];
  title: string;
  id: string;
  tags?: string[];
}

async function ingestCompleteTang() {
  console.log(`\n📂 准备扫描全唐诗目录: ${TANG_DIR}`);

  if (!fs.existsSync(TANG_DIR)) {
    console.error(`❌ 目录不存在: ${TANG_DIR}`);
    return;
  }

  // 只读取 poet.tang 开头的文件
  const files = fs.readdirSync(TANG_DIR).filter(file => file.startsWith('poet.tang.') && file.endsWith('.json'));
  console.log(`📊 发现 ${files.length} 个全唐诗文件 (约 5.7万首)，准备导入...`);

  let totalInserted = 0;

  for (const file of files) {
    const filePath = path.join(TANG_DIR, file);
    console.log(`\n📄 处理文件: ${file}`);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const rawData: TangPoem[] = JSON.parse(fileContent);
      
      const cleanData = rawData.map(item => ({
        // 如果源数据没有 ID，数据库会自动生成 UUID
        // 如果源数据有 ID，可以保留 (但要注意去重)
        title: item.title,
        author: item.author,
        content: item.paragraphs,
        dynasty: '唐', // 标记为唐代
        tags: item.tags || [],
        updated_at: new Date().toISOString(),
      }));

      // 批量写入 (每 100 条一次，加快速度)
      const BATCH_SIZE = 100;
      for (let i = 0; i < cleanData.length; i += BATCH_SIZE) {
        const batch = cleanData.slice(i, i + BATCH_SIZE);
        
        // 使用 insert，如果担心 ID 冲突报错，可以使用 upsert 并在 SQL 里设置约束
        const { error } = await supabase.from('poems').insert(batch);

        if (error) {
          console.error(`❌ 写入失败 (${file} batch ${i}):`, error.message);
        } else {
          totalInserted += batch.length;
          process.stdout.write(`🚀 [${file}] 已导入 ${Math.min(i + BATCH_SIZE, cleanData.length)}/${cleanData.length} (总计: ${totalInserted})...\r`);
        }
      }
    } catch (err) {
      console.error(`❌ 文件 ${file} 处理出错:`, err);
    }
  }
  console.log(`\n\n✅ 全唐诗导入完成！共计: ${totalInserted}`);
}

ingestCompleteTang();
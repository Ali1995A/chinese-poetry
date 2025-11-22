import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// 1. 加载环境变量
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error('❌ 找不到 .env.local 文件');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 设定目录：source_data/全宋诗
const DIR_PATH = path.join(process.cwd(), 'source_data', '全宋诗');

async function ingest() {
  console.log(`📂 准备扫描目录: ${DIR_PATH}`);

  if (!fs.existsSync(DIR_PATH)) {
    console.error(`❌ 找不到文件夹: ${DIR_PATH}`);
    console.error('请确保你已经创建了 source_data/全宋诗 文件夹并把文件放进去了');
    return;
  }

  // 只找 poet.song 开头的文件
  const files = fs.readdirSync(DIR_PATH).filter(file => file.startsWith('poet.song.') && file.endsWith('.json'));
  console.log(`📊 发现 ${files.length} 个全宋诗文件，准备开始导入...`);

  let totalCount = 0;

  for (const file of files) {
    const filePath = path.join(DIR_PATH, file);
    console.log(`\n📄 正在处理文件: ${file}`);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const poems = JSON.parse(content);
      
      const cleanData = poems.map((p: any) => ({
        title: p.title || '无题',
        author: p.author || '佚名',
        content: p.paragraphs,
        dynasty: '宋', // 强制标记为宋代
        tags: p.tags || [],
        updated_at: new Date().toISOString(),
      }));

      // 宋诗太多，每批 200 条加快速度
      const BATCH_SIZE = 200;
      for (let i = 0; i < cleanData.length; i += BATCH_SIZE) {
        const batch = cleanData.slice(i, i + BATCH_SIZE);
        const { error } = await supabase.from('poems').insert(batch);

        if (error) {
          console.error(`❌ 写入出错: ${error.message}`);
        } else {
          totalCount += batch.length;
          process.stdout.write(`🚀 已导入 ${Math.min(i + BATCH_SIZE, cleanData.length)}/${cleanData.length} (累计: ${totalCount})...\r`);
        }
      }
    } catch (e) {
      console.error(`❌ 文件 ${file} 读取失败，跳过。`);
    }
  }
  console.log(`\n\n✅ 全宋诗导入完成！总共: ${totalCount} 首`);
}

ingest();
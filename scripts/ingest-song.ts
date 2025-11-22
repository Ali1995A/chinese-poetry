import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// ==========================================
// 1. 环境配置加载 (强制读取 .env.local)
// ==========================================
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`🔍 正在加载环境配置: ${envPath}`);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error('❌ 找不到 .env.local 文件！');
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 环境变量缺失，请检查 .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// 2. 宋词专用逻辑
// ==========================================

// 宋词的 JSON 结构与唐诗不同
interface SongCi {
  author: string;
  paragraphs: string[];
  rhythmic: string; // 词牌名 (相当于标题)
  tags?: string[];
}

// 设置宋词文件夹路径: source_data/宋词
const SONG_DIR = path.join(process.cwd(), 'source_data', '宋词');

async function ingestSongCi() {
  console.log(`\n📂 准备扫描宋词目录: ${SONG_DIR}`);

  if (!fs.existsSync(SONG_DIR)) {
    console.error(`❌ 目录不存在: ${SONG_DIR}`);
    console.error('   请确认你把宋词文件夹放在了 source_data 目录下');
    process.exit(1);
  }

  // 1. 获取目录下所有 ci.song.*.json 文件
  const files = fs.readdirSync(SONG_DIR).filter(file => file.startsWith('ci.song.') && file.endsWith('.json'));
  console.log(`📊 发现 ${files.length} 个宋词数据文件，准备开始导入...`);

  let totalInserted = 0;

  // 2. 遍历每个文件
  for (const file of files) {
    const filePath = path.join(SONG_DIR, file);
    console.log(`\n📄 处理文件: ${file}`);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const rawData: SongCi[] = JSON.parse(fileContent);
      
      // 数据清洗映射
      const cleanData = rawData.map(item => ({
        // 宋词没有 ID，让数据库自动生成
        title: item.rhythmic, // 关键：把“词牌名”映射为“标题”
        author: item.author,
        content: item.paragraphs,
        dynasty: '宋', // 自动标记为宋代
        tags: item.tags || [],
        updated_at: new Date().toISOString(),
      }));

      // 批量写入 (每 50 条一次)
      const BATCH_SIZE = 50;
      for (let i = 0; i < cleanData.length; i += BATCH_SIZE) {
        const batch = cleanData.slice(i, i + BATCH_SIZE);
        
        const { error } = await supabase.from('poems').insert(batch); // 这里用 insert 而不是 upsert，因为没有 ID

        if (error) {
          console.error(`❌ 写入失败 (${file}):`, error.message);
        } else {
          totalInserted += batch.length;
          process.stdout.write(`🚀 [${file}] 已导入 ${Math.min(i + BATCH_SIZE, cleanData.length)}/${cleanData.length} (总计: ${totalInserted})...\r`);
        }
      }

    } catch (err) {
      console.error(`❌ 处理文件 ${file} 时出错:`, err);
    }
  }

  console.log(`\n\n✅ 全部完成！共导入 ${totalInserted} 首宋词。`);
}

ingestSongCi();
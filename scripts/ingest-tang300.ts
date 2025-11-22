import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// ==========================================
// 1. 环境配置加载 (修复读取不到 .env.local 的问题)
// ==========================================
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`🔍 正在尝试加载配置文件: ${envPath}`);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('✅ 成功加载 .env.local 环境变量');
} else {
  // 如果找不到 .env.local，尝试找 .env
  const fallbackPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(fallbackPath)) {
    dotenv.config({ path: fallbackPath });
    console.log('✅ 成功加载 .env 环境变量');
  } else {
    console.error('❌ 严重错误: 找不到 .env.local 或 .env 文件！');
    console.error('   请确保文件在项目根目录，且文件名没有隐藏后缀 (如 .txt)');
    process.exit(1);
  }
}

// 检查变量是否存在
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 环境变量加载失败！');
  console.error('   请检查文件内容是否包含: NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// 初始化 Supabase 客户端
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// 2. 数据处理逻辑
// ==========================================

// 定义源数据接口 (根据 chinese-poetry JSON 结构)
interface SourcePoem {
  id: string;
  title: string;
  author: string;
  paragraphs: string[];
  tags?: string[];
}

const DATA_PATH = path.join(process.cwd(), 'source_data', 'tang300.json');

async function ingestData() {
  console.log(`\n📂 正在读取数据文件: ${DATA_PATH}`);

  if (!fs.existsSync(DATA_PATH)) {
    console.error(`❌ 找不到数据文件: ${DATA_PATH}`);
    console.error('   请确保你已经下载了 JSON 文件并重命名为 tang300.json');
    process.exit(1);
  }

  try {
    // 1. 读取并解析 JSON
    const fileContent = fs.readFileSync(DATA_PATH, 'utf-8');
    const rawData: SourcePoem[] = JSON.parse(fileContent);
    console.log(`📊 成功解析 JSON，共找到 ${rawData.length} 首诗`);

    // 2. 数据清洗与转换 (Map)
    // 将 GitHub 的格式转换为我们数据库的 poems 表格式
    const cleanData = rawData.map((item) => ({
      id: item.id, // 保持原始 ID (如果是 UUID) 或者让数据库自动生成(如果不传)
      title: item.title,
      author: item.author,
      content: item.paragraphs, // 关键映射: paragraphs -> content
      dynasty: '唐', // 硬编码朝代
      tags: item.tags || [],
      updated_at: new Date().toISOString(),
    }));

    // 3. 批量写入 (Batch Insert)
    // 一次写入太多会报错，我们每 50 条写一次
    const BATCH_SIZE = 50;
    let successCount = 0;

    for (let i = 0; i < cleanData.length; i += BATCH_SIZE) {
      const batch = cleanData.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

      // 使用 upsert (插入或更新)，防止重复运行报错
      const { error } = await supabase.from('poems').upsert(batch, { 
        onConflict: 'id', // 如果 ID 相同则更新
        ignoreDuplicates: false 
      });

      if (error) {
        console.error(`❌ 第 ${batchNumber} 批次写入失败:`, error.message);
      } else {
        successCount += batch.length;
        process.stdout.write(`🚀 已写入第 ${batchNumber} 批 (${Math.min(i + BATCH_SIZE, cleanData.length)}/${cleanData.length})...\r`);
      }
    }

    console.log(`\n\n✅ 数据导入完成！`);
    console.log(`   成功: ${successCount}`);
    console.log(`   总数: ${rawData.length}`);

  } catch (err) {
    console.error('\n❌ 发生未预期的错误:', err);
  }
}

// 运行主函数
ingestData();
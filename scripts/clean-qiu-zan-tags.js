// 清理包含"求赞"的标签脚本
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// 从环境变量获取配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('请检查.env.local文件中的 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY 配置');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '已设置' : '未设置');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '已设置' : '未设置');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanQiuZanTags() {
  console.log('开始检查包含"求赞"的诗词...');
  
  try {
    // 1. 查找标题中包含"求赞"的诗词
    const { data: poemsByTitle, error: titleError } = await supabase
      .from('poems')
      .select('id, title, author, dynasty, tags')
      .ilike('title', '%求赞%');
    
    if (titleError) {
      console.error('查询标题失败:', titleError);
      return;
    }
    
    console.log(`找到 ${poemsByTitle.length} 首标题包含"求赞"的诗词:`);
    poemsByTitle.forEach(poem => {
      console.log(`- ${poem.title} (${poem.author}, ${poem.dynasty})`);
    });
    
    // 2. 查找标签中包含"求赞"的诗词
    const { data: allPoems, error } = await supabase
      .from('poems')
      .select('id, title, author, dynasty, tags')
      .not('tags', 'is', null);
    
    if (error) {
      console.error('查询诗词失败:', error);
      return;
    }
    
    const poemsWithQiuZanTags = allPoems.filter(poem => {
      if (!poem.tags || !Array.isArray(poem.tags)) return false;
      return poem.tags.some(tag => tag.includes('求赞'));
    });
    
    console.log(`\n找到 ${poemsWithQiuZanTags.length} 首标签包含"求赞"的诗词:`);
    
    // 3. 清理这些标签
    for (const poem of poemsWithQiuZanTags) {
      const originalTags = [...poem.tags];
      const cleanedTags = poem.tags.filter(tag => !tag.includes('求赞'));
      
      console.log(`\n清理诗词: ${poem.title} (${poem.author})`);
      console.log(`原标签: ${JSON.stringify(originalTags)}`);
      console.log(`清理后: ${JSON.stringify(cleanedTags)}`);
      
      // 更新数据库
      const { error: updateError } = await supabase
        .from('poems')
        .update({ tags: cleanedTags })
        .eq('id', poem.id);
      
      if (updateError) {
        console.error(`更新诗词 ${poem.id} 失败:`, updateError);
      } else {
        console.log(`✓ 成功清理诗词 ${poem.id} 的标签`);
      }
    }
    
    console.log('\n检查完成！');
    
  } catch (err) {
    console.error('检查过程中出错:', err);
  }
}

// 执行清理
cleanQiuZanTags();
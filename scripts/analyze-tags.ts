import { supabase } from '@/utils/supabase';

interface TagStats {
  tag: string;
  count: number;
  poems: string[];
}

interface DynastyStats {
  dynasty: string;
  count: number;
  authors: Set<string>;
}

interface AuthorStats {
  author: string;
  count: number;
  dynasties: Set<string>;
}

interface ContentStats {
  totalPoems: number;
  totalTags: number;
  uniqueTags: number;
  uniqueAuthors: number;
  uniqueDynasties: number;
}

async function analyzeTags() {
  console.log('开始分析诗词数据标签...\n');

  try {
    // 获取所有诗词数据
    const { data: poems, error } = await supabase
      .from('poems')
      .select('id, title, author, dynasty, tags, content');

    if (error) {
      console.error('获取数据失败:', error);
      return;
    }

    if (!poems || poems.length === 0) {
      console.log('没有找到诗词数据');
      return;
    }

    console.log(`共找到 ${poems.length} 首诗词\n`);

    // 统计标签
    const tagStats: Record<string, TagStats> = {};
    const dynastyStats: Record<string, DynastyStats> = {};
    const authorStats: Record<string, AuthorStats> = {};
    const contentStats: ContentStats = {
      totalPoems: poems.length,
      totalTags: 0,
      uniqueTags: 0,
      uniqueAuthors: 0,
      uniqueDynasties: 0
    };

    // 遍历所有诗词
    poems.forEach(poem => {
      // 统计朝代
      if (poem.dynasty) {
        if (!dynastyStats[poem.dynasty]) {
          dynastyStats[poem.dynasty] = {
            dynasty: poem.dynasty,
            count: 0,
            authors: new Set()
          };
        }
        dynastyStats[poem.dynasty].count++;
        if (poem.author) {
          dynastyStats[poem.dynasty].authors.add(poem.author);
        }
      }

      // 统计作者
      if (poem.author) {
        if (!authorStats[poem.author]) {
          authorStats[poem.author] = {
            author: poem.author,
            count: 0,
            dynasties: new Set()
          };
        }
        authorStats[poem.author].count++;
        if (poem.dynasty) {
          authorStats[poem.author].dynasties.add(poem.dynasty);
        }
      }

      // 统计标签
      if (poem.tags && Array.isArray(poem.tags)) {
        poem.tags.forEach(tag => {
          if (tag && typeof tag === 'string') {
            const cleanTag = tag.trim();
            if (cleanTag) {
              if (!tagStats[cleanTag]) {
                tagStats[cleanTag] = {
                  tag: cleanTag,
                  count: 0,
                  poems: []
                };
              }
              tagStats[cleanTag].count++;
              tagStats[cleanTag].poems.push(poem.title);
              contentStats.totalTags++;
            }
          }
        });
      }
    });

    // 更新统计信息
    contentStats.uniqueTags = Object.keys(tagStats).length;
    contentStats.uniqueAuthors = Object.keys(authorStats).length;
    contentStats.uniqueDynasties = Object.keys(dynastyStats).length;

    // 输出统计结果
    console.log('=== 总体统计 ===');
    console.log(`诗词总数: ${contentStats.totalPoems}`);
    console.log(`标签总数: ${contentStats.totalTags}`);
    console.log(`唯一标签数: ${contentStats.uniqueTags}`);
    console.log(`唯一作者数: ${contentStats.uniqueAuthors}`);
    console.log(`唯一朝代数: ${contentStats.uniqueDynasties}\n`);

    // 输出朝代统计
    console.log('=== 朝代统计 ===');
    const sortedDynasties = Object.values(dynastyStats)
      .sort((a, b) => b.count - a.count);
    
    sortedDynasties.forEach(dynasty => {
      console.log(`${dynasty.dynasty}: ${dynasty.count} 首 (${dynasty.authors.size} 位作者)`);
    });

    // 输出作者统计
    console.log('\n=== 作者统计 (前20位) ===');
    const sortedAuthors = Object.values(authorStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    
    sortedAuthors.forEach(author => {
      console.log(`${author.author}: ${author.count} 首 (${Array.from(author.dynasties).join(', ')})`);
    });

    // 输出标签统计
    console.log('\n=== 标签统计 (前50位) ===');
    const sortedTags = Object.values(tagStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);
    
    sortedTags.forEach(tag => {
      console.log(`${tag.tag}: ${tag.count} 次`);
    });

    // 输出标签分类
    console.log('\n=== 标签分类分析 ===');
    
    // 情感类标签
    const emotionTags = sortedTags.filter(tag => 
      tag.tag.includes('情') || 
      tag.tag.includes('思') || 
      tag.tag.includes('愁') ||
      tag.tag.includes('爱') ||
      tag.tag.includes('别') ||
      tag.tag.includes('怨')
    );
    console.log(`情感类标签 (${emotionTags.length}个):`);
    emotionTags.slice(0, 10).forEach(tag => {
      console.log(`  ${tag.tag}: ${tag.count} 次`);
    });

    // 自然类标签
    const natureTags = sortedTags.filter(tag => 
      tag.tag.includes('山') || 
      tag.tag.includes('水') || 
      tag.tag.includes('花') ||
      tag.tag.includes('月') ||
      tag.tag.includes('风') ||
      tag.tag.includes('雨') ||
      tag.tag.includes('春') ||
      tag.tag.includes('秋') ||
      tag.tag.includes('冬') ||
      tag.tag.includes('夏')
    );
    console.log(`\n自然类标签 (${natureTags.length}个):`);
    natureTags.slice(0, 10).forEach(tag => {
      console.log(`  ${tag.tag}: ${tag.count} 次`);
    });

    // 地点类标签
    const locationTags = sortedTags.filter(tag => 
      tag.tag.includes('江') || 
      tag.tag.includes('河') || 
      tag.tag.includes('湖') ||
      tag.tag.includes('海') ||
      tag.tag.includes('城') ||
      tag.tag.includes('楼') ||
      tag.tag.includes('寺') ||
      tag.tag.includes('宫')
    );
    console.log(`\n地点类标签 (${locationTags.length}个):`);
    locationTags.slice(0, 10).forEach(tag => {
      console.log(`  ${tag.tag}: ${tag.count} 次`);
    });

    // 风格类标签
    const styleTags = sortedTags.filter(tag => 
      tag.tag.includes('豪') || 
      tag.tag.includes('婉') || 
      tag.tag.includes('边') ||
      tag.tag.includes('田') ||
      tag.tag.includes('咏') ||
      tag.tag.includes('抒')
    );
    console.log(`\n风格类标签 (${styleTags.length}个):`);
    styleTags.slice(0, 10).forEach(tag => {
      console.log(`  ${tag.tag}: ${tag.count} 次`);
    });

    // 生成标签使用建议
    console.log('\n=== 标签使用建议 ===');
    console.log('1. 高频情感标签:', emotionTags.slice(0, 5).map(t => t.tag).join(', '));
    console.log('2. 高频自然标签:', natureTags.slice(0, 5).map(t => t.tag).join(', '));
    console.log('3. 高频地点标签:', locationTags.slice(0, 5).map(t => t.tag).join(', '));
    console.log('4. 高频风格标签:', styleTags.slice(0, 5).map(t => t.tag).join(', '));

    // 保存详细统计到文件
    const fs = require('fs');
    const path = require('path');
    
    const statsData = {
      contentStats,
      dynasties: sortedDynasties,
      authors: sortedAuthors,
      tags: sortedTags,
      emotionTags: emotionTags.slice(0, 20),
      natureTags: natureTags.slice(0, 20),
      locationTags: locationTags.slice(0, 20),
      styleTags: styleTags.slice(0, 20),
      analyzedAt: new Date().toISOString()
    };

    const outputPath = path.join(process.cwd(), 'scripts', 'tag-analysis.json');
    fs.writeFileSync(outputPath, JSON.stringify(statsData, null, 2), 'utf8');
    console.log(`\n详细统计已保存到: ${outputPath}`);

  } catch (error) {
    console.error('分析过程中发生错误:', error);
  }
}

// 运行分析
analyzeTags();
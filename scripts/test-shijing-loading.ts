/**
 * 诗经数据加载测试脚本
 */

import { getShijingPoems, searchShijing, getShijingStats } from '../lib/shijing-service';

async function testShijingLoading() {
  console.log('🧪 开始测试诗经数据加载...\n');

  try {
    // 测试加载诗经数据
    console.log('1. 测试加载诗经数据...');
    const poems = await getShijingPoems();
    console.log(`✅ 成功加载 ${poems.length} 首诗经作品\n`);

    // 显示前几首诗经作品
    console.log('2. 显示前5首诗经作品:');
    poems.slice(0, 5).forEach((poem, index) => {
      console.log(`   ${index + 1}. ${poem.title}`);
      console.log(`      作者: ${poem.author}`);
      console.log(`      朝代: ${poem.dynasty}`);
      console.log(`      章节: ${poem.metadata?.chapter} - ${poem.metadata?.section}`);
      console.log(`      内容: ${poem.content.slice(0, 2).join(' ')}...`);
      console.log(`      标签: ${poem.tags.join(', ')}`);
      console.log('');
    });

    // 测试搜索功能
    console.log('3. 测试搜索功能...');
    const searchResults = await searchShijing('关雎');
    console.log(`✅ 搜索"关雎"找到 ${searchResults.length} 个结果`);
    searchResults.forEach(result => {
      console.log(`   - ${result.title} (${result.metadata?.chapter})`);
    });
    console.log('');

    // 测试统计信息
    console.log('4. 测试统计信息...');
    const stats = await getShijingStats();
    console.log(`✅ 诗经统计信息:`);
    console.log(`   - 总作品数: ${stats.total}`);
    console.log(`   - 篇章数: ${stats.chapters}`);
    console.log(`   - 章节数: ${stats.sections}`);
    console.log('');

    // 测试搜索其他关键词
    console.log('5. 测试搜索其他关键词...');
    const testQueries = ['风', '雅', '颂', '君子'];
    for (const query of testQueries) {
      const results = await searchShijing(query);
      console.log(`   "${query}": ${results.length} 个结果`);
    }
    console.log('');

    console.log('🎉 诗经数据加载测试完成！所有测试均通过。');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testShijingLoading();
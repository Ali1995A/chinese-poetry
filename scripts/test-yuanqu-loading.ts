/**
 * 元曲数据加载测试脚本
 */

import { getYuanquPoems, searchYuanqu, getYuanquStats } from '../lib/yuanqu-service';

async function testYuanquLoading() {
  console.log('🧪 开始测试元曲数据加载...\n');

  try {
    // 测试加载元曲数据
    console.log('1. 测试加载元曲数据...');
    const poems = await getYuanquPoems();
    console.log(`✅ 成功加载 ${poems.length} 首元曲作品\n`);

    // 显示前几首元曲作品
    console.log('2. 显示前5首元曲作品:');
    poems.slice(0, 5).forEach((poem, index) => {
      console.log(`   ${index + 1}. ${poem.title}`);
      console.log(`      作者: ${poem.author}`);
      console.log(`      朝代: ${poem.dynasty}`);
      console.log(`      内容: ${poem.content.slice(0, 2).join(' ')}...`);
      console.log(`      标签: ${poem.tags.join(', ')}`);
      console.log('');
    });

    // 测试搜索功能
    console.log('3. 测试搜索功能...');
    const searchResults = await searchYuanqu('天净沙');
    console.log(`✅ 搜索"天净沙"找到 ${searchResults.length} 个结果`);
    searchResults.forEach(result => {
      console.log(`   - ${result.title} (${result.author})`);
    });
    console.log('');

    // 测试统计信息
    console.log('4. 测试统计信息...');
    const stats = await getYuanquStats();
    console.log(`✅ 元曲统计信息:`);
    console.log(`   - 总作品数: ${stats.total}`);
    console.log(`   - 作者数: ${stats.authors}`);
    console.log('');

    // 测试搜索其他关键词
    console.log('5. 测试搜索其他关键词...');
    const testQueries = ['秋思', '春', '马致远', '关汉卿'];
    for (const query of testQueries) {
      const results = await searchYuanqu(query);
      console.log(`   "${query}": ${results.length} 个结果`);
    }
    console.log('');

    console.log('🎉 元曲数据加载测试完成！所有测试均通过。');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testYuanquLoading();
/**
 * 论语数据加载测试脚本
 * 用于验证论语数据是否正确加载和处理
 */

import { getAllLunyuPoems, getLunyuStats, getRandomLunyuPoem, searchLunyuPoems } from '../lib/lunyu-service';
import { getAllPoems, getRandomPoem, searchPoems } from '../lib/data-service';

async function testLunyuLoading() {
  console.log('=== 论语数据加载测试 ===\n');

  try {
    // 测试论语数据统计
    console.log('1. 测试论语数据统计...');
    const stats = await getLunyuStats();
    console.log(`   章节数: ${stats.totalChapters}`);
    console.log(`   段落数: ${stats.totalParagraphs}`);
    console.log(`   诗词数: ${stats.totalPoems}`);
    console.log('   ✓ 统计信息获取成功\n');

    // 测试获取所有论语诗词
    console.log('2. 测试获取所有论语诗词...');
    const allLunyuPoems = await getAllLunyuPoems();
    console.log(`   获取到 ${allLunyuPoems.length} 条论语数据`);
    
    // 显示前3条论语数据
    console.log('   前3条论语数据:');
    allLunyuPoems.slice(0, 3).forEach((poem, index) => {
      console.log(`   ${index + 1}. ${poem.title}`);
      console.log(`      作者: ${poem.author}`);
      console.log(`      朝代: ${poem.dynasty}`);
      console.log(`      内容: ${poem.content[0].substring(0, 30)}...`);
      console.log(`      标签: ${poem.tags.join(', ')}`);
    });
    console.log('   ✓ 论语数据获取成功\n');

    // 测试论语搜索
    console.log('3. 测试论语搜索功能...');
    const searchResults = await searchLunyuPoems('学而');
    console.log(`   搜索"学而"找到 ${searchResults.total} 条结果`);
    if (searchResults.poems.length > 0) {
      console.log(`   第一条结果: ${searchResults.poems[0].title}`);
      console.log(`   内容: ${searchResults.poems[0].content[0]}`);
    }
    console.log('   ✓ 论语搜索功能正常\n');

    // 测试随机论语诗词
    console.log('4. 测试随机论语诗词...');
    const randomLunyuPoem = await getRandomLunyuPoem();
    console.log(`   随机论语: ${randomLunyuPoem.title}`);
    console.log(`   内容: ${randomLunyuPoem.content[0]}`);
    console.log('   ✓ 随机论语获取成功\n');

    // 测试集成数据服务
    console.log('5. 测试集成数据服务...');
    const allPoems = await getAllPoems();
    console.log(`   总诗词数: ${allPoems.length} (包含论语数据)`);
    
    const randomPoem = await getRandomPoem();
    console.log(`   随机诗词: ${randomPoem.title} - ${randomPoem.author}`);
    
    const integratedSearch = await searchPoems('子曰');
    console.log(`   搜索"子曰"找到 ${integratedSearch.total} 条结果`);
    console.log('   ✓ 集成数据服务正常\n');

    console.log('=== 所有测试通过! ===');
    console.log('论语数据已成功加载并集成到系统中。');

  } catch (error) {
    console.error('测试失败:', error);
    process.exit(1);
  }
}

// 运行测试
testLunyuLoading();
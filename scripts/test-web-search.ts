/**
 * 网页搜索功能测试脚本
 * 用于验证论语数据是否能在网页搜索中找到
 */

import { searchLunyuPoems } from '../lib/lunyu-service';

async function testWebSearch() {
  console.log('=== 网页搜索功能测试 ===\n');

  try {
    // 测试搜索"子曰"
    console.log('1. 测试搜索"子曰"...');
    const results1 = await searchLunyuPoems('子曰');
    console.log(`   找到 ${results1.total} 条论语结果`);
    results1.poems.slice(0, 3).forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.title} - ${result.author}`);
      console.log(`      内容: ${result.content[0].substring(0, 40)}...`);
    });
    console.log('   ✓ "子曰"搜索测试完成\n');

    // 测试搜索"学而"
    console.log('2. 测试搜索"学而"...');
    const results2 = await searchLunyuPoems('学而');
    console.log(`   找到 ${results2.total} 条论语结果`);
    results2.poems.slice(0, 3).forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.title} - ${result.author}`);
      console.log(`      内容: ${result.content[0].substring(0, 40)}...`);
    });
    console.log('   ✓ "学而"搜索测试完成\n');

    // 测试搜索"论语"
    console.log('3. 测试搜索"论语"...');
    const results3 = await searchLunyuPoems('论语');
    console.log(`   找到 ${results3.total} 条论语结果`);
    results3.poems.slice(0, 3).forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.title} - ${result.author}`);
      console.log(`      标签: ${result.tags.join(', ')}`);
    });
    console.log('   ✓ "论语"搜索测试完成\n');

    // 测试搜索"孔子"
    console.log('4. 测试搜索"孔子"...');
    const results4 = await searchLunyuPoems('孔子');
    console.log(`   找到 ${results4.total} 条论语结果`);
    results4.poems.slice(0, 3).forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.title} - ${result.author}`);
      console.log(`      内容: ${result.content[0].substring(0, 40)}...`);
    });
    console.log('   ✓ "孔子"搜索测试完成\n');

    console.log('=== 网页搜索测试完成! ===');
    console.log('论语数据现在应该可以在网页搜索中找到了。');
    console.log('请重启开发服务器并在网页中搜索"子曰"、"学而"等关键词来验证。');

  } catch (error) {
    console.error('测试失败:', error);
    process.exit(1);
  }
}

// 运行测试
testWebSearch();
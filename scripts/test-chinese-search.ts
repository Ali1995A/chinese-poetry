/**
 * 测试中文简繁搜索功能
 */

import { searchPoems } from '../lib/data-service';
import { sishuwujingService } from '../lib/sishuwujing-service';
import { generateSearchVariants, simplifiedToTraditional, traditionalToSimplified } from '../utils/chinese-converter';

async function testChineseSearch() {
  console.log('=== 中文简繁搜索功能测试 ===\n');

  // 测试简繁转换功能
  console.log('1. 简繁转换测试:');
  const testWords = ['学', '经', '书', '礼', '义', '仁', '智', '信'];
  testWords.forEach(word => {
    const traditional = simplifiedToTraditional(word);
    const backToSimplified = traditionalToSimplified(traditional);
    console.log(`   ${word} -> ${traditional} -> ${backToSimplified}`);
  });

  console.log('\n2. 搜索变体生成测试:');
  const testQueries = ['学', '大学', '仁义', '智慧'];
  testQueries.forEach(query => {
    const variants = generateSearchVariants(query);
    console.log(`   "${query}" -> ${JSON.stringify(variants)}`);
  });

  console.log('\n3. 四书五经搜索测试:');
  
  // 测试简体搜索
  console.log('   a) 简体搜索 "大学":');
  const simplifiedResult = await sishuwujingService.search('大学');
  console.log(`      找到 ${simplifiedResult.length} 个结果`);
  simplifiedResult.slice(0, 2).forEach(poem => {
    console.log(`      - ${poem.title} (${poem.author})`);
  });

  // 测试繁体搜索
  console.log('   b) 繁体搜索 "大學":');
  const traditionalResult = await sishuwujingService.search('大學');
  console.log(`      找到 ${traditionalResult.length} 个结果`);
  traditionalResult.slice(0, 2).forEach(poem => {
    console.log(`      - ${poem.title} (${poem.author})`);
  });

  // 测试混合搜索
  console.log('   c) 混合搜索 "仁义":');
  const mixedResult = await sishuwujingService.search('仁义');
  console.log(`      找到 ${mixedResult.length} 个结果`);
  mixedResult.slice(0, 2).forEach(poem => {
    console.log(`      - ${poem.title} (${poem.author})`);
  });

  console.log('\n4. 全局搜索测试:');
  
  // 测试简体搜索
  console.log('   a) 简体搜索 "君子":');
  const globalSimplified = await searchPoems('君子');
  console.log(`      找到 ${globalSimplified.total} 个结果`);
  globalSimplified.poems.slice(0, 3).forEach(poem => {
    console.log(`      - ${poem.title} (${poem.author}) - ${poem.source}`);
  });

  // 测试繁体搜索
  console.log('   b) 繁体搜索 "君子":');
  const globalTraditional = await searchPoems('君子');
  console.log(`      找到 ${globalTraditional.total} 个结果`);
  globalTraditional.poems.slice(0, 3).forEach(poem => {
    console.log(`      - ${poem.title} (${poem.author}) - ${poem.source}`);
  });

  console.log('\n5. 搜索性能测试:');
  const testCases = [
    { query: '学', description: '单字简体' },
    { query: '學', description: '单字繁体' },
    { query: '大学', description: '双字简体' },
    { query: '大學', description: '双字繁体' },
    { query: '仁义', description: '混合简体' },
    { query: '仁義', description: '混合繁体' }
  ];

  for (const testCase of testCases) {
    const startTime = Date.now();
    const result = await searchPoems(testCase.query);
    const endTime = Date.now();
    console.log(`   "${testCase.query}" (${testCase.description}): ${result.total} 个结果, ${endTime - startTime}ms`);
  }

  console.log('\n=== 测试完成 ===');
}

// 运行测试
testChineseSearch().catch(console.error);
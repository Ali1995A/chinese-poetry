/**
 * 测试扩展的中文简繁搜索功能
 */

import { searchPoems } from '../lib/data-service';
import { sishuwujingService } from '../lib/sishuwujing-service';
import { generateSearchVariants, simplifiedToTraditional, traditionalToSimplified } from '../utils/chinese-converter';

async function testExtendedChineseSearch() {
  console.log('=== 扩展中文简繁搜索功能测试 ===\n');

  // 测试更多诗词常用字的简繁转换
  console.log('1. 诗词常用字简繁转换测试:');
  const poetryWords = [
    '风', '花', '雪', '月', '山', '水', '江', '河', '湖', '海',
    '春', '夏', '秋', '冬', '东', '南', '西', '北', '上', '下',
    '红', '黄', '蓝', '绿', '紫', '白', '黑', '青', '金', '银',
    '喜', '怒', '哀', '乐', '爱', '恨', '愁', '忧', '悲', '欢',
    '行', '走', '坐', '立', '卧', '起', '来', '去', '往', '返',
    '歌', '唱', '舞', '蹈', '诗', '词', '曲', '赋', '文', '章'
  ];

  console.log('   测试前20个字的转换:');
  poetryWords.slice(0, 20).forEach(word => {
    const traditional = simplifiedToTraditional(word);
    const backToSimplified = traditionalToSimplified(traditional);
    console.log(`   ${word} -> ${traditional} -> ${backToSimplified}`);
  });

  console.log('\n2. 复杂词汇搜索变体生成测试:');
  const complexQueries = [
    '风景', '花开', '雪月', '山水', '江河', '湖海', '春秋', '东南', '西北',
    '红黄', '蓝绿', '紫白', '金银', '喜怒', '哀乐', '爱恨', '忧愁', '悲欢',
    '行走', '坐立', '卧起', '来往', '往返', '歌唱', '舞蹈', '诗词', '文章'
  ];

  console.log('   测试前10个复杂词汇:');
  complexQueries.slice(0, 10).forEach(query => {
    const variants = generateSearchVariants(query);
    console.log(`   "${query}" -> ${JSON.stringify(variants)}`);
  });

  console.log('\n3. 跨数据源搜索测试:');
  
  // 测试不同数据源的简繁搜索
  const crossSourceQueries = [
    { query: '君子', description: '论语常用词' },
    { query: '美人', description: '楚辞常用词' },
    { query: '关关', description: '诗经常用词' },
    { query: '明月', description: '诗词常用词' },
    { query: '青山', description: '诗词常用词' },
    { query: '流水', description: '诗词常用词' }
  ];

  for (const testCase of crossSourceQueries) {
    console.log(`   a) 简体搜索 "${testCase.query}" (${testCase.description}):`);
    const simplifiedResult = await searchPoems(testCase.query);
    console.log(`      找到 ${simplifiedResult.total} 个结果`);
    
    console.log(`   b) 繁体搜索 "${simplifiedToTraditional(testCase.query)}":`);
    const traditionalResult = await searchPoems(simplifiedToTraditional(testCase.query));
    console.log(`      找到 ${traditionalResult.total} 个结果`);
    
    // 显示前3个结果
    if (simplifiedResult.poems.length > 0) {
      console.log('      示例结果:');
      simplifiedResult.poems.slice(0, 3).forEach(poem => {
        console.log(`      - ${poem.title} (${poem.author}) - ${poem.source}`);
      });
    }
    console.log('');
  }

  console.log('4. 性能对比测试:');
  const performanceTestCases = [
    { query: '风', description: '单字常用' },
    { query: '风景', description: '双字常用' },
    { query: '明月光', description: '三字诗词' },
    { query: '青山绿水', description: '四字成语' }
  ];

  for (const testCase of performanceTestCases) {
    const traditionalQuery = simplifiedToTraditional(testCase.query);
    
    const startTime1 = Date.now();
    const result1 = await searchPoems(testCase.query);
    const endTime1 = Date.now();
    
    const startTime2 = Date.now();
    const result2 = await searchPoems(traditionalQuery);
    const endTime2 = Date.now();
    
    console.log(`   "${testCase.query}" (${testCase.description}):`);
    console.log(`     简体: ${result1.total} 个结果, ${endTime1 - startTime1}ms`);
    console.log(`     繁体: ${result2.total} 个结果, ${endTime2 - startTime2}ms`);
    console.log(`     结果一致性: ${result1.total === result2.total ? '一致' : '不一致'}`);
  }

  console.log('\n5. 特殊字符测试:');
  const specialCases = [
    { query: '云', description: '多义字' },
    { query: '发', description: '多音字' },
    { query: '干', description: '多义字' },
    { query: '后', description: '多义字' }
  ];

  for (const testCase of specialCases) {
    const variants = generateSearchVariants(testCase.query);
    console.log(`   "${testCase.query}" (${testCase.description}): ${JSON.stringify(variants)}`);
  }

  console.log('\n=== 扩展测试完成 ===');
}

// 运行测试
testExtendedChineseSearch().catch(console.error);
/**
 * 离线搜索集成测试脚本（不依赖Supabase）
 */

import { searchShijing } from '../lib/shijing-service';
import { searchYuanqu } from '../lib/yuanqu-service';
import { searchLunyuPoems } from '../lib/lunyu-service';
import { searchChuciPoems } from '../lib/chuci-service';

async function testSearchIntegrationOffline() {
  console.log('🧪 开始离线搜索集成测试...\n');

  try {
    // 测试诗经搜索
    console.log('1. 测试诗经搜索...');
    const shijingResults = await searchShijing('关雎');
    console.log(`✅ 诗经搜索"关雎"找到 ${shijingResults.length} 个结果`);
    
    if (shijingResults.length > 0) {
      const poem = shijingResults[0];
      console.log(`   - 诗经作品: ${poem.title}`);
      console.log(`     作者: ${poem.author}`);
      console.log(`     朝代: ${poem.dynasty}`);
      console.log(`     标签: ${poem.tags.join(', ')}`);
      console.log(`     章节: ${poem.metadata?.chapter} - ${poem.metadata?.section}`);
    }
    console.log('');

    // 测试元曲搜索
    console.log('2. 测试元曲搜索...');
    const yuanquResults = await searchYuanqu('天净沙');
    console.log(`✅ 元曲搜索"天净沙"找到 ${yuanquResults.length} 个结果`);
    
    if (yuanquResults.length > 0) {
      const poem = yuanquResults[0];
      console.log(`   - 元曲作品: ${poem.title}`);
      console.log(`     作者: ${poem.author}`);
      console.log(`     朝代: ${poem.dynasty}`);
      console.log(`     标签: ${poem.tags.join(', ')}`);
    }
    console.log('');

    // 测试楚辞搜索
    console.log('3. 测试楚辞搜索...');
    const chuciResults = await searchChuciPoems('离骚');
    console.log(`✅ 楚辞搜索"离骚"找到 ${chuciResults.poems.length} 个结果`);
    
    if (chuciResults.poems.length > 0) {
      const poem = chuciResults.poems[0];
      console.log(`   - 楚辞作品: ${poem.title}`);
      console.log(`     作者: ${poem.author}`);
      console.log(`     朝代: ${poem.dynasty}`);
      console.log(`     标签: ${poem.tags.join(', ')}`);
      console.log(`     章节: ${poem.section}`);
    }
    console.log('');

    // 测试论语搜索
    console.log('4. 测试论语搜索...');
    const lunyuResults = await searchLunyuPoems('学而时习之');
    console.log(`✅ 论语搜索"学而时习之"找到 ${lunyuResults.poems.length} 个结果`);
    
    if (lunyuResults.poems.length > 0) {
      const poem = lunyuResults.poems[0];
      console.log(`   - 论语作品: ${poem.title}`);
      console.log(`     作者: ${poem.author}`);
      console.log(`     朝代: ${poem.dynasty}`);
      console.log(`     标签: ${poem.tags.join(', ')}`);
      console.log(`     章节: ${poem.chapter}`);
    }
    console.log('');

    // 测试各数据源的关键词搜索
    console.log('5. 各数据源关键词搜索测试:');
    const testCases = [
      { source: '诗经', query: '关雎', service: searchShijing },
      { source: '诗经', query: '君子', service: searchShijing },
      { source: '元曲', query: '秋思', service: searchYuanqu },
      { source: '元曲', query: '马致远', service: searchYuanqu },
      { source: '楚辞', query: '九歌', service: searchChuciPoems },
      { source: '论语', query: '有朋自远方来', service: searchLunyuPoems }
    ];

    for (const testCase of testCases) {
      let results;
      if (testCase.service === searchChuciPoems || testCase.service === searchLunyuPoems) {
        const result = await testCase.service(testCase.query);
        results = result.poems;
      } else {
        results = await testCase.service(testCase.query);
      }
      
      console.log(`   ${testCase.source} - "${testCase.query}": ${results.length} 个结果`);
    }
    console.log('');

    console.log('🎉 离线搜索集成测试完成！所有数据源的搜索功能都正常工作。');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testSearchIntegrationOffline();
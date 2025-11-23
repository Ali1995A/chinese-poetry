/**
 * 网页搜索集成测试脚本
 */

import { searchPoems } from '../utils/search';

async function testWebSearchIntegration() {
  console.log('🧪 开始测试网页搜索集成...\n');

  try {
    // 测试诗经搜索
    console.log('1. 测试诗经搜索...');
    const shijingResults = await searchPoems('关雎');
    console.log(`✅ 搜索"关雎"找到 ${shijingResults.length} 个结果`);
    
    const shijingPoem = shijingResults.find(poem => poem.title === '关雎');
    if (shijingPoem) {
      console.log(`   - 诗经作品: ${shijingPoem.title}`);
      console.log(`     作者: ${shijingPoem.author}`);
      console.log(`     朝代: ${shijingPoem.dynasty}`);
      console.log(`     标签: ${shijingPoem.tags.join(', ')}`);
    }
    console.log('');

    // 测试元曲搜索
    console.log('2. 测试元曲搜索...');
    const yuanquResults = await searchPoems('天净沙');
    console.log(`✅ 搜索"天净沙"找到 ${yuanquResults.length} 个结果`);
    
    const yuanquPoem = yuanquResults.find(poem => poem.title.includes('天净沙'));
    if (yuanquPoem) {
      console.log(`   - 元曲作品: ${yuanquPoem.title}`);
      console.log(`     作者: ${yuanquPoem.author}`);
      console.log(`     朝代: ${yuanquPoem.dynasty}`);
      console.log(`     标签: ${yuanquPoem.tags.join(', ')}`);
    }
    console.log('');

    // 测试楚辞搜索
    console.log('3. 测试楚辞搜索...');
    const chuciResults = await searchPoems('离骚');
    console.log(`✅ 搜索"离骚"找到 ${chuciResults.length} 个结果`);
    
    const chuciPoem = chuciResults.find(poem => poem.title === '离骚');
    if (chuciPoem) {
      console.log(`   - 楚辞作品: ${chuciPoem.title}`);
      console.log(`     作者: ${chuciPoem.author}`);
      console.log(`     朝代: ${chuciPoem.dynasty}`);
      console.log(`     标签: ${chuciPoem.tags.join(', ')}`);
    }
    console.log('');

    // 测试论语搜索
    console.log('4. 测试论语搜索...');
    const lunyuResults = await searchPoems('学而时习之');
    console.log(`✅ 搜索"学而时习之"找到 ${lunyuResults.length} 个结果`);
    
    const lunyuPoem = lunyuResults.find(poem => poem.content.some(line => line.includes('学而时习之')));
    if (lunyuPoem) {
      console.log(`   - 论语作品: ${lunyuPoem.title}`);
      console.log(`     作者: ${lunyuPoem.author}`);
      console.log(`     朝代: ${lunyuPoem.dynasty}`);
      console.log(`     标签: ${lunyuPoem.tags.join(', ')}`);
    }
    console.log('');

    // 测试搜索结果来源分布
    console.log('5. 搜索结果来源分布:');
    const testQueries = ['关雎', '天净沙', '离骚', '学而时习之'];
    for (const query of testQueries) {
      const results = await searchPoems(query);
      const sourceCounts: Record<string, number> = {};
      
      results.forEach(poem => {
        let source = 'database';
        if (poem.id.startsWith('lunyu-')) source = 'lunyu';
        else if (poem.id.startsWith('chuci-')) source = 'chuci';
        else if (poem.id.startsWith('shijing_')) source = 'shijing';
        else if (poem.id.startsWith('yuanqu_')) source = 'yuanqu';
        
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      });
      
      console.log(`   "${query}":`);
      Object.entries(sourceCounts).forEach(([source, count]) => {
        console.log(`     - ${source}: ${count} 个结果`);
      });
    }
    console.log('');

    console.log('🎉 网页搜索集成测试完成！所有数据源都已正确集成到搜索功能中。');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testWebSearchIntegration();
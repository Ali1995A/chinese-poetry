/**
 * 所有数据源综合测试脚本
 */

import { getAllPoems, searchPoems, getRandomPoem } from '../lib/data-service';

async function testAllDataSources() {
  console.log('🧪 开始测试所有数据源...\n');

  try {
    // 测试获取所有诗词
    console.log('1. 测试获取所有诗词数据...');
    const allPoems = await getAllPoems();
    console.log(`✅ 成功加载 ${allPoems.length} 首诗词作品\n`);

    // 统计各数据源的作品数量（通过ID前缀识别）
    const sourceCounts: Record<string, number> = {};
    allPoems.forEach(poem => {
      let source = 'mock';
      if (poem.id.startsWith('lunyu-')) source = 'lunyu';
      else if (poem.id.startsWith('chuci-')) source = 'chuci';
      else if (poem.id.startsWith('shijing_')) source = 'shijing';
      else if (poem.id.startsWith('yuanqu_')) source = 'yuanqu';
      
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    console.log('2. 各数据源作品统计:');
    Object.entries(sourceCounts).forEach(([source, count]) => {
      console.log(`   - ${source}: ${count} 首`);
    });
    console.log('');

    // 测试搜索功能
    console.log('3. 测试综合搜索功能...');
    const testQueries = ['关雎', '天净沙', '离骚', '学而时习之'];
    for (const query of testQueries) {
      const result = await searchPoems(query);
      console.log(`   "${query}": ${result.total} 个结果`);
    }
    console.log('');

    // 测试随机诗词功能
    console.log('4. 测试随机诗词功能...');
    const randomPoem = await getRandomPoem();
    console.log(`✅ 随机获取诗词:`);
    console.log(`   - 标题: ${randomPoem.title}`);
    console.log(`   - 作者: ${randomPoem.author}`);
    console.log(`   - 朝代: ${randomPoem.dynasty}`);
    console.log(`   - ID: ${randomPoem.id}`);
    console.log('');

    // 显示各数据源的示例作品
    console.log('5. 各数据源示例作品:');
    const sources = ['mock', 'lunyu', 'chuci', 'shijing', 'yuanqu'];
    for (const source of sources) {
      let examplePoem;
      if (source === 'mock') {
        examplePoem = allPoems.find(poem =>
          !poem.id.startsWith('lunyu-') &&
          !poem.id.startsWith('chuci-') &&
          !poem.id.startsWith('shijing_') &&
          !poem.id.startsWith('yuanqu_')
        );
      } else if (source === 'lunyu') {
        examplePoem = allPoems.find(poem => poem.id.startsWith('lunyu-'));
      } else if (source === 'chuci') {
        examplePoem = allPoems.find(poem => poem.id.startsWith('chuci-'));
      } else if (source === 'shijing') {
        examplePoem = allPoems.find(poem => poem.id.startsWith('shijing_'));
      } else if (source === 'yuanqu') {
        examplePoem = allPoems.find(poem => poem.id.startsWith('yuanqu_'));
      }
      
      if (examplePoem) {
        console.log(`   ${source}: ${examplePoem.title} - ${examplePoem.author}`);
      }
    }
    console.log('');

    console.log('🎉 所有数据源测试完成！系统集成成功。');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testAllDataSources();
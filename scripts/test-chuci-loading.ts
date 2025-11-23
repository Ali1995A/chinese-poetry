import { getAllChuciPoems, getChuciPoemById, searchChuciPoems, getRandomChuciPoem, getChuciStats } from '../lib/chuci-service';

/**
 * 测试楚辞数据加载功能
 */
async function testChuciLoading() {
  console.log('🧪 开始测试楚辞数据加载功能...\n');

  try {
    // 测试获取所有楚辞诗词
    console.log('1. 测试获取所有楚辞诗词...');
    const allPoems = await getAllChuciPoems();
    console.log(`✅ 成功获取 ${allPoems.length} 首楚辞诗词\n`);

    // 测试获取随机楚辞诗词
    console.log('2. 测试获取随机楚辞诗词...');
    const randomPoem = await getRandomChuciPoem();
    console.log(`✅ 随机楚辞诗词: "${randomPoem.title}" - ${randomPoem.author}\n`);

    // 测试根据ID获取楚辞诗词
    console.log('3. 测试根据ID获取楚辞诗词...');
    const poemById = await getChuciPoemById('chuci-1');
    if (poemById) {
      console.log(`✅ 根据ID获取成功: "${poemById.title}" - ${poemById.author}`);
      console.log(`   内容预览: ${poemById.content.slice(0, 2).join(' ')}...\n`);
    } else {
      console.log('❌ 根据ID获取失败\n');
    }

    // 测试搜索功能
    console.log('4. 测试搜索功能...');
    const searchResults = await searchChuciPoems('离骚');
    console.log(`✅ 搜索"离骚"找到 ${searchResults.total} 个结果`);
    if (searchResults.poems.length > 0) {
      console.log(`   第一个结果: "${searchResults.poems[0].title}" - ${searchResults.poems[0].author}\n`);
    }

    // 测试搜索功能 - 作者
    console.log('5. 测试搜索作者功能...');
    const authorResults = await searchChuciPoems('屈原');
    console.log(`✅ 搜索"屈原"找到 ${authorResults.total} 个结果\n`);

    // 测试统计信息
    console.log('6. 测试统计信息...');
    const stats = await getChuciStats();
    console.log(`✅ 楚辞统计信息:`);
    console.log(`   总诗词数: ${stats.totalPoems}`);
    console.log(`   总章节数: ${stats.totalSections}`);
    console.log(`   总作者数: ${stats.totalAuthors}\n`);

    // 显示一些示例数据
    console.log('7. 显示前5首楚辞诗词示例:');
    allPoems.slice(0, 5).forEach((poem, index) => {
      console.log(`   ${index + 1}. "${poem.title}" - ${poem.author} (${poem.dynasty})`);
      console.log(`      章节: ${poem.section}`);
      console.log(`      标签: ${poem.tags.slice(0, 3).join(', ')}`);
      console.log(`      内容预览: ${poem.content[0].substring(0, 30)}...`);
      console.log('');
    });

    console.log('🎉 所有楚辞数据加载测试完成！');

  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error);
  }
}

// 运行测试
testChuciLoading();
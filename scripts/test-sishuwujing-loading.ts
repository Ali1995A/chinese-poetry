/**
 * 测试四书五经数据加载功能
 */

import { sishuwujingService } from '../lib/sishuwujing-service';

async function testSishuwujingLoading() {
  console.log('🧪 开始测试四书五经数据加载...\n');

  try {
    // 测试加载所有数据
    console.log('1. 测试加载所有四书五经数据...');
    const allData = await sishuwujingService.getAllData();
    console.log(`   ✅ 成功加载四书五经数据`);
    console.log(`   📚 大学章节: ${allData.daxue.chapter}`);
    console.log(`   📚 孟子章节数: ${allData.mengzi.length}`);
    console.log(`   📚 中庸章节: ${allData.zhongyong.chapter}\n`);

    // 测试转换为诗词格式
    console.log('2. 测试转换为诗词格式...');
    const poems = await sishuwujingService.convertToPoems();
    console.log(`   ✅ 成功转换 ${poems.length} 个四书五经条目`);
    
    // 显示部分诗词信息
    poems.slice(0, 3).forEach((poem, index) => {
      console.log(`   ${index + 1}. ${poem.title} - ${poem.author}`);
      console.log(`      来源: ${poem.source}, 章节: ${poem.chapter}`);
      console.log(`      内容预览: ${poem.content.substring(0, 50)}...\n`);
    });

    // 测试搜索功能
    console.log('3. 测试搜索功能...');
    const searchResults = await sishuwujingService.search('仁');
    console.log(`   ✅ 搜索"仁"找到 ${searchResults.length} 个结果`);
    
    searchResults.slice(0, 2).forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.title} - ${result.source}`);
    });
    console.log('');

    // 测试根据ID获取
    console.log('4. 测试根据ID获取...');
    if (poems.length > 0) {
      const testPoem = await sishuwujingService.getById(poems[0].id);
      if (testPoem) {
        console.log(`   ✅ 成功获取诗词: ${testPoem.title}`);
      } else {
        console.log('   ❌ 获取诗词失败');
      }
    }
    console.log('');

    // 测试统计信息
    console.log('5. 测试统计信息...');
    const stats = await sishuwujingService.getStats();
    console.log(`   ✅ 统计信息:`);
    console.log(`      总章节数: ${stats.totalChapters}`);
    console.log(`      总段落数: ${stats.totalParagraphs}`);
    console.log(`      大学段落数: ${stats.sources.daxue}`);
    console.log(`      孟子段落数: ${stats.sources.mengzi}`);
    console.log(`      中庸段落数: ${stats.sources.zhongyong}\n`);

    // 测试获取特定数据
    console.log('6. 测试获取特定数据...');
    const daxueData = await sishuwujingService.getDaxue();
    console.log(`   ✅ 大学数据: ${daxueData.chapter}, ${daxueData.paragraphs.length} 段落`);

    const mengziData = await sishuwujingService.getMengzi();
    console.log(`   ✅ 孟子数据: ${mengziData.length} 个章节`);

    const zhongyongData = await sishuwujingService.getZhongyong();
    console.log(`   ✅ 中庸数据: ${zhongyongData.chapter}, ${zhongyongData.paragraphs.length} 段落\n`);

    console.log('🎉 所有四书五经数据加载测试通过！');
    console.log('📊 数据统计:');
    console.log(`   - 大学: 1 个章节, ${daxueData.paragraphs.length} 个段落`);
    console.log(`   - 孟子: ${mengziData.length} 个章节, ${stats.sources.mengzi} 个段落`);
    console.log(`   - 中庸: 1 个章节, ${zhongyongData.paragraphs.length} 个段落`);
    console.log(`   - 总计: ${stats.totalChapters} 个章节, ${stats.totalParagraphs} 个段落`);

  } catch (error) {
    console.error('❌ 四书五经数据加载测试失败:', error);
    process.exit(1);
  }
}

// 运行测试
testSishuwujingLoading();
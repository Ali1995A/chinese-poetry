import { searchPoems } from '../utils/search';
import { getAllPoems } from '../lib/data-service';

/**
 * 测试集成楚辞数据后的web搜索功能
 */
async function testWebSearchWithChuci() {
  console.log('🧪 开始测试集成楚辞数据后的web搜索功能...\n');

  try {
    // 测试获取所有诗词（包括楚辞数据）
    console.log('1. 测试获取所有诗词（包括楚辞数据）...');
    const allPoems = await getAllPoems();
    console.log(`✅ 成功获取 ${allPoems.length} 首诗词（包括楚辞数据）\n`);

    // 测试搜索楚辞相关关键词
    console.log('2. 测试搜索楚辞相关关键词...');
    
    // 搜索"屈原"
    console.log('   - 搜索"屈原"...');
    const quyuanResults = await searchPoems('屈原');
    console.log(`     找到 ${quyuanResults.length} 个结果`);
    if (quyuanResults.length > 0) {
      console.log(`     第一个结果: "${quyuanResults[0].title}" - ${quyuanResults[0].author}`);
    }

    // 搜索"离骚"
    console.log('   - 搜索"离骚"...');
    const lisaoResults = await searchPoems('离骚');
    console.log(`     找到 ${lisaoResults.length} 个结果`);
    if (lisaoResults.length > 0) {
      console.log(`     第一个结果: "${lisaoResults[0].title}" - ${lisaoResults[0].author}`);
    }

    // 搜索"九歌"
    console.log('   - 搜索"九歌"...');
    const jiugeResults = await searchPoems('九歌');
    console.log(`     找到 ${jiugeResults.length} 个结果`);
    if (jiugeResults.length > 0) {
      console.log(`     第一个结果: "${jiugeResults[0].title}" - ${jiugeResults[0].author}`);
    }

    // 搜索"楚辞"
    console.log('   - 搜索"楚辞"...');
    const chuciResults = await searchPoems('楚辞');
    console.log(`     找到 ${chuciResults.length} 个结果`);
    if (chuciResults.length > 0) {
      console.log(`     第一个结果: "${chuciResults[0].title}" - ${chuciResults[0].author}`);
    }

    console.log('');

    // 显示搜索结果中的楚辞诗词
    console.log('3. 显示搜索结果中的楚辞诗词示例:');
    const chuciPoemsInResults = allPoems.filter(poem => 
      poem.id.startsWith('chuci-') || 
      poem.tags.includes('楚辞') ||
      poem.author === '屈原' ||
      poem.author === '宋玉'
    ).slice(0, 5);

    chuciPoemsInResults.forEach((poem, index) => {
      console.log(`   ${index + 1}. "${poem.title}" - ${poem.author} (${poem.dynasty})`);
      console.log(`      ID: ${poem.id}`);
      console.log(`      内容预览: ${poem.content[0].substring(0, 30)}...`);
      console.log('');
    });

    // 统计各类诗词数量
    console.log('4. 统计各类诗词数量:');
    const mockPoemsCount = allPoems.filter(poem => poem.id.startsWith('mock-')).length;
    const lunyuPoemsCount = allPoems.filter(poem => poem.id.startsWith('lunyu-')).length;
    const chuciPoemsCount = allPoems.filter(poem => poem.id.startsWith('chuci-')).length;
    
    console.log(`   - 模拟诗词: ${mockPoemsCount} 首`);
    console.log(`   - 论语诗词: ${lunyuPoemsCount} 首`);
    console.log(`   - 楚辞诗词: ${chuciPoemsCount} 首`);
    console.log(`   - 总计: ${allPoems.length} 首\n`);

    console.log('🎉 集成楚辞数据后的web搜索测试完成！');

  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error);
  }
}

// 运行测试
testWebSearchWithChuci();
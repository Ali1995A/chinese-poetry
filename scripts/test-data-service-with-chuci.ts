import { getAllPoems, getPoemById, searchPoems, getRandomPoem } from '../lib/data-service';

/**
 * 测试集成楚辞数据后的数据服务功能
 */
async function testDataServiceWithChuci() {
  console.log('🧪 开始测试集成楚辞数据后的数据服务功能...\n');

  try {
    // 测试获取所有诗词（包括楚辞数据）
    console.log('1. 测试获取所有诗词（包括楚辞数据）...');
    const allPoems = await getAllPoems();
    console.log(`✅ 成功获取 ${allPoems.length} 首诗词（包括楚辞数据）\n`);

    // 测试根据ID获取楚辞诗词
    console.log('2. 测试根据ID获取楚辞诗词...');
    const chuciPoem = await getPoemById('chuci-1');
    if (chuciPoem) {
      console.log(`✅ 根据ID获取楚辞诗词成功: "${chuciPoem.title}" - ${chuciPoem.author}`);
      console.log(`   内容预览: ${chuciPoem.content[0].substring(0, 30)}...\n`);
    } else {
      console.log('❌ 根据ID获取楚辞诗词失败\n');
    }

    // 测试搜索功能
    console.log('3. 测试搜索功能...');
    
    // 搜索"屈原"
    console.log('   - 搜索"屈原"...');
    const quyuanResults = await searchPoems('屈原');
    console.log(`     找到 ${quyuanResults.total} 个结果`);
    if (quyuanResults.poems.length > 0) {
      console.log(`     第一个结果: "${quyuanResults.poems[0].title}" - ${quyuanResults.poems[0].author}`);
    }

    // 搜索"离骚"
    console.log('   - 搜索"离骚"...');
    const lisaoResults = await searchPoems('离骚');
    console.log(`     找到 ${lisaoResults.total} 个结果`);
    if (lisaoResults.poems.length > 0) {
      console.log(`     第一个结果: "${lisaoResults.poems[0].title}" - ${lisaoResults.poems[0].author}`);
    }

    // 搜索"九歌"
    console.log('   - 搜索"九歌"...');
    const jiugeResults = await searchPoems('九歌');
    console.log(`     找到 ${jiugeResults.total} 个结果`);
    if (jiugeResults.poems.length > 0) {
      console.log(`     第一个结果: "${jiugeResults.poems[0].title}" - ${jiugeResults.poems[0].author}`);
    }

    console.log('');

    // 测试随机诗词功能
    console.log('4. 测试随机诗词功能...');
    const randomPoem = await getRandomPoem();
    console.log(`✅ 随机诗词: "${randomPoem.title}" - ${randomPoem.author}`);
    console.log(`   ID: ${randomPoem.id}`);
    console.log(`   朝代: ${randomPoem.dynasty}\n`);

    // 显示搜索结果中的楚辞诗词
    console.log('5. 显示搜索结果中的楚辞诗词示例:');
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
    console.log('6. 统计各类诗词数量:');
    const mockPoemsCount = allPoems.filter(poem => poem.id.startsWith('mock-')).length;
    const lunyuPoemsCount = allPoems.filter(poem => poem.id.startsWith('lunyu-')).length;
    const chuciPoemsCount = allPoems.filter(poem => poem.id.startsWith('chuci-')).length;
    
    console.log(`   - 模拟诗词: ${mockPoemsCount} 首`);
    console.log(`   - 论语诗词: ${lunyuPoemsCount} 首`);
    console.log(`   - 楚辞诗词: ${chuciPoemsCount} 首`);
    console.log(`   - 总计: ${allPoems.length} 首\n`);

    console.log('🎉 集成楚辞数据后的数据服务测试完成！');

  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error);
  }
}

// 运行测试
testDataServiceWithChuci();
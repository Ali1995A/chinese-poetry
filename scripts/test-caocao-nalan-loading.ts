import { getAllCaoCaoPoems, getCaoCaoPoemById, searchCaoCaoPoems } from '../lib/caocao-service';
import { getAllNalanXingdePoems, getNalanXingdePoemById, searchNalanXingdePoems } from '../lib/nalanxingde-service';
import { getAllPoems, getPoemById, searchPoems } from '../lib/data-service';

async function testCaoCaoData() {
  console.log('=== 测试曹操诗集数据加载 ===');
  
  try {
    // 测试获取所有曹操诗词
    const allCaoCaoPoems = await getAllCaoCaoPoems();
    console.log(`✅ 成功加载曹操诗词数量: ${allCaoCaoPoems.length}`);
    
    // 显示前几首诗词
    console.log('\n前3首曹操诗词:');
    allCaoCaoPoems.slice(0, 3).forEach((poem, index) => {
      console.log(`${index + 1}. ${poem.title} - ${poem.author}`);
      console.log(`   内容: ${poem.content.substring(0, 50)}...`);
    });
    
    // 测试根据ID获取诗词
    if (allCaoCaoPoems.length > 0) {
      const firstPoem = allCaoCaoPoems[0];
      const poemById = await getCaoCaoPoemById(firstPoem.id);
      console.log(`\n✅ 根据ID获取诗词: ${poemById?.title}`);
    }
    
    // 测试搜索功能
    const searchResults = searchCaoCaoPoems(allCaoCaoPoems, '曹操');
    console.log(`\n✅ 搜索"曹操"结果数量: ${searchResults.length}`);
    
    return allCaoCaoPoems.length;
  } catch (error) {
    console.error('❌ 曹操诗集数据加载失败:', error);
    return 0;
  }
}

async function testNalanXingdeData() {
  console.log('\n=== 测试纳兰性德数据加载 ===');
  
  try {
    // 测试获取所有纳兰性德诗词
    const allNalanPoems = await getAllNalanXingdePoems();
    console.log(`✅ 成功加载纳兰性德诗词数量: ${allNalanPoems.length}`);
    
    // 显示前几首诗词
    console.log('\n前3首纳兰性德诗词:');
    allNalanPoems.slice(0, 3).forEach((poem, index) => {
      console.log(`${index + 1}. ${poem.title} - ${poem.author}`);
      console.log(`   内容: ${poem.content.substring(0, 50)}...`);
    });
    
    // 测试根据ID获取诗词
    if (allNalanPoems.length > 0) {
      const firstPoem = allNalanPoems[0];
      const poemById = await getNalanXingdePoemById(firstPoem.id);
      console.log(`\n✅ 根据ID获取诗词: ${poemById?.title}`);
    }
    
    // 测试搜索功能
    const searchResults = searchNalanXingdePoems(allNalanPoems, '纳兰');
    console.log(`\n✅ 搜索"纳兰"结果数量: ${searchResults.length}`);
    
    return allNalanPoems.length;
  } catch (error) {
    console.error('❌ 纳兰性德数据加载失败:', error);
    return 0;
  }
}

async function testIntegratedData() {
  console.log('\n=== 测试集成数据服务 ===');
  
  try {
    // 测试获取所有诗词
    const allPoems = await getAllPoems();
    console.log(`✅ 集成数据服务总诗词数量: ${allPoems.length}`);
    
    // 统计各数据源数量
    const caocaoCount = allPoems.filter(p => p.source === '曹操诗集').length;
    const nalanCount = allPoems.filter(p => p.source === '纳兰性德').length;
    const lunyuCount = allPoems.filter(p => p.source === '论语').length;
    const chuciCount = allPoems.filter(p => p.source === '楚辞').length;
    const shijingCount = allPoems.filter(p => p.source === '诗经').length;
    const yuanquCount = allPoems.filter(p => p.source === '元曲').length;
    const mockCount = allPoems.filter(p => !p.source).length;
    
    console.log('\n各数据源诗词数量统计:');
    console.log(`  曹操诗集: ${caocaoCount}`);
    console.log(`  纳兰性德: ${nalanCount}`);
    console.log(`  论语: ${lunyuCount}`);
    console.log(`  楚辞: ${chuciCount}`);
    console.log(`  诗经: ${shijingCount}`);
    console.log(`  元曲: ${yuanquCount}`);
    console.log(`  模拟数据: ${mockCount}`);
    
    // 测试搜索功能
    const searchResults = await searchPoems('曹操');
    console.log(`\n✅ 集成搜索"曹操"结果数量: ${searchResults.total}`);
    
    // 测试根据ID获取诗词
    if (allPoems.length > 0) {
      const firstPoem = allPoems[0];
      const poemById = await getPoemById(firstPoem.id);
      console.log(`\n✅ 集成服务根据ID获取诗词: ${poemById?.title}`);
    }
    
    return allPoems.length;
  } catch (error) {
    console.error('❌ 集成数据服务测试失败:', error);
    return 0;
  }
}

async function main() {
  console.log('开始测试曹操诗集和纳兰性德数据加载...\n');
  
  const caocaoCount = await testCaoCaoData();
  const nalanCount = await testNalanXingdeData();
  const totalCount = await testIntegratedData();
  
  console.log('\n=== 测试总结 ===');
  console.log(`曹操诗集诗词数量: ${caocaoCount}`);
  console.log(`纳兰性德诗词数量: ${nalanCount}`);
  console.log(`集成服务总诗词数量: ${totalCount}`);
  
  if (caocaoCount > 0 && nalanCount > 0 && totalCount > 0) {
    console.log('\n🎉 所有测试通过！曹操诗集和纳兰性德数据已成功集成到系统中。');
  } else {
    console.log('\n⚠️ 部分测试未通过，请检查数据文件和服务实现。');
  }
}

// 运行测试
main().catch(console.error);
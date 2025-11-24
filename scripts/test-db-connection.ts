import { supabase } from '../utils/supabase';

async function testDatabaseConnection() {
  console.log('正在测试数据库连接...');
  
  try {
    // 测试连接
    const { data, error } = await supabase
      .from('poems')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ 数据库连接失败:', error.message);
      console.error('错误详情:', error);
      return false;
    }

    console.log('✅ 数据库连接成功');
    
    // 检查 poems 表是否有数据
    const { data: poemsData, error: poemsError } = await supabase
      .from('poems')
      .select('id, title, author')
      .limit(5);

    if (poemsError) {
      console.error('❌ 查询 poems 表失败:', poemsError.message);
      return false;
    }

    console.log('✅ poems 表查询成功');
    console.log('📊 示例数据:', poemsData);
    
    return true;
  } catch (err) {
    console.error('❌ 连接测试异常:', err);
    return false;
  }
}

testDatabaseConnection().then(success => {
  if (success) {
    console.log('🎉 数据库连接测试完成');
  } else {
    console.log('💥 数据库连接测试失败');
    process.exit(1);
  }
});
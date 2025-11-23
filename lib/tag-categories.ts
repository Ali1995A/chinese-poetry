// 标签分类映射 - 基于实际数据标签优化
export const tagCategories = {
  // 朝代经典
  '朝代经典': [
    '唐', '宋', '元', '诗经', '楚辞', '汉', '魏晋', '南北朝', '五代', '明', '清'
  ],
  
  // 诗人名家
  '诗人名家': [
    '李白', '杜甫', '苏轼', '李清照', '王维', '白居易', '李商隐', '杜牧', 
    '辛弃疾', '陆游', '王安石', '陶渊明', '孟浩然', '刘禹锡', '韩愈', '柳宗元'
  ],
  
  // 蒙学启蒙
  '蒙学启蒙': [
    '三字经', '唐诗三百首', '千字文', '百家姓', '弟子规', '声律启蒙', 
    '幼学琼林', '增广贤文', '朱子家训', '古文观止'
  ],
  
  // 山水风光
  '山水风光': [
    '山水', '西湖', '长江', '黄河', '洞庭湖', '太湖', '庐山', '黄山', 
    '华山', '泰山', '峨眉山', '洞庭', '江南', '塞北', '边塞'
  ],
  
  // 风格流派
  '风格流派': [
    '婉约', '豪放', '边塞', '田园', '山水', '咏史', '怀古', '抒情', 
    '叙事', '讽喻', '浪漫主义', '现实主义'
  ],
  
  // 情感主题
  '情感主题': [
    '相思', '离别', '爱情', '友情', '思乡', '怀人', '忧愁', '喜悦', 
    '孤独', '寂寞', '感慨', '人生', '时光', '岁月'
  ],
  
  // 自然景物
  '自然景物': [
    '春', '夏', '秋', '冬', '月', '花', '雪', '雨', '风', '云', '山', '水',
    '梅', '兰', '竹', '菊', '松', '柳', '桃', '杏'
  ],
  
  // 节日节气
  '节日节气': [
    '春节', '元宵', '清明', '端午', '中秋', '重阳', '除夕', '立春', 
    '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种'
  ]
};

// 获取标签的分类
export function getTagCategory(tag: string): string | null {
  for (const [category, tags] of Object.entries(tagCategories)) {
    if (tags.includes(tag)) {
      return category;
    }
  }
  return null;
}

// 根据标签生成精选主题配置
export function generateCollectionFromTag(tag: string, category: string) {
  const collectionConfigs = {
    // 朝代经典
    '唐': {
      title: '大唐风华',
      subtitle: 'Tang Dynasty',
      description: '盛唐气象，诗酒风流，感受李白、杜甫等大家的豪迈与沉郁',
      icon: 'mountain',
      href: `/poems?dynasty=${tag}`,
      color: 'from-blue-500/10 to-purple-500/10',
      accentColor: 'text-blue-600'
    },
    '宋': {
      title: '宋词雅韵',
      subtitle: 'Song Ci',
      description: '婉约豪放，词牌格律，品味苏轼、李清照的词中意境',
      icon: 'wind',
      href: `/poems?dynasty=${tag}`,
      color: 'from-green-500/10 to-teal-500/10',
      accentColor: 'text-green-600'
    },
    '元': {
      title: '元曲风情',
      subtitle: 'Yuan Qu',
      description: '市井风情，散曲杂剧，体验元代文学的独特魅力',
      icon: 'feather',
      href: `/poems?dynasty=${tag}`,
      color: 'from-orange-500/10 to-red-500/10',
      accentColor: 'text-orange-600'
    },
    '诗经': {
      title: '诗经古韵',
      subtitle: 'Shi Jing',
      description: '风雅颂三体，四言古韵，中国诗歌的源头活水',
      icon: 'scroll',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-amber-500/10 to-yellow-500/10',
      accentColor: 'text-amber-600'
    },
    '楚辞': {
      title: '楚辞浪漫',
      subtitle: 'Chu Ci',
      description: '屈原离骚，浪漫主义，南方文学的瑰丽篇章',
      icon: 'sparkles',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-pink-500/10 to-rose-500/10',
      accentColor: 'text-pink-600'
    },
    
    // 诗人名家
    '李白': {
      title: '诗仙·李白',
      subtitle: 'Li Bai',
      description: '谪仙人，诗酒剑，浪漫主义诗歌的巅峰代表',
      icon: 'sparkles',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-yellow-500/10 to-orange-500/10',
      accentColor: 'text-yellow-600'
    },
    '杜甫': {
      title: '诗圣·杜甫',
      subtitle: 'Du Fu',
      description: '诗史，沉郁顿挫，现实主义诗歌的集大成者',
      icon: 'book-open',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-red-500/10 to-pink-500/10',
      accentColor: 'text-red-600'
    },
    '苏轼': {
      title: '东坡·苏轼',
      subtitle: 'Su Shi',
      description: '豪放词宗，诗书画三绝，宋代文学的代表人物',
      icon: 'user',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-indigo-500/10 to-blue-500/10',
      accentColor: 'text-indigo-600'
    },
    '李清照': {
      title: '易安·李清照',
      subtitle: 'Li Qingzhao',
      description: '婉约词后，才情横溢，宋代女词人的杰出代表',
      icon: 'crown',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-purple-500/10 to-pink-500/10',
      accentColor: 'text-purple-600'
    },
    
    // 蒙学启蒙
    '三字经': {
      title: '三字经',
      subtitle: 'Three Character Classic',
      description: '人之初，性本善，中国传统蒙学第一书',
      icon: 'book-open',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-sky-500/10 to-blue-500/10',
      accentColor: 'text-sky-600'
    },
    '唐诗三百首': {
      title: '唐诗三百首',
      subtitle: '300 Tang Poems',
      description: '熟读唐诗三百首，不会作诗也会吟，经典唐诗选集',
      icon: 'book-marked',
      href: `/poems?dynasty=唐`,
      color: 'from-rose-500/10 to-pink-500/10',
      accentColor: 'text-rose-600'
    },
    
    // 山水风光
    '西湖': {
      title: '西湖诗韵',
      subtitle: 'West Lake',
      description: '欲把西湖比西子，淡妆浓抹总相宜，西湖美景的诗意表达',
      icon: 'trees',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-emerald-500/10 to-green-500/10',
      accentColor: 'text-emerald-600'
    },
    '长江': {
      title: '长江情怀',
      subtitle: 'Yangtze River',
      description: '我住长江头，君住长江尾，长江流域的诗词情怀',
      icon: 'map',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-blue-500/10 to-cyan-500/10',
      accentColor: 'text-blue-600'
    },
    
    // 风格流派
    '婉约': {
      title: '婉约词风',
      subtitle: 'Graceful Ci',
      description: '杨柳岸，晓风残月，婉约词的细腻柔情与含蓄之美',
      icon: 'flower',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-pink-500/10 to-rose-500/10',
      accentColor: 'text-pink-600'
    },
    '豪放': {
      title: '豪放词派',
      subtitle: 'Heroic Ci',
      description: '大江东去，浪淘尽，豪放词的磅礴气势与壮阔胸怀',
      icon: 'zap',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-red-500/10 to-orange-500/10',
      accentColor: 'text-red-600'
    },
    
    // 情感主题
    '相思': {
      title: '相思爱情',
      subtitle: 'Love Poetry',
      description: '此情可待成追忆，只是当时已惘然，爱情诗词的深情表达',
      icon: 'heart',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-pink-500/10 to-rose-500/10',
      accentColor: 'text-pink-600'
    },
    '离别': {
      title: '离别愁绪',
      subtitle: 'Farewell Poetry',
      description: '劝君更尽一杯酒，西出阳关无故人，离别诗词的深情厚谊',
      icon: 'feather',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-purple-500/10 to-violet-500/10',
      accentColor: 'text-purple-600'
    },
    
    // 自然景物
    '月': {
      title: '月夜相思',
      subtitle: 'Moon Poetry',
      description: '举头望明月，低头思故乡，月亮与相思的永恒主题',
      icon: 'moon',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-indigo-500/10 to-blue-500/10',
      accentColor: 'text-indigo-600'
    },
    '春': {
      title: '四季诗情',
      subtitle: 'Four Seasons',
      description: '春华秋实，夏雨冬雪，四季变换的诗意表达',
      icon: 'sun',
      href: `/poems?q=${encodeURIComponent(tag)}`,
      color: 'from-amber-500/10 to-orange-500/10',
      accentColor: 'text-amber-600'
    }
  };

  return collectionConfigs[tag as keyof typeof collectionConfigs] || {
    title: tag,
    subtitle: tag,
    description: `关于${tag}的诗词作品精选`,
    icon: 'book-open',
    href: `/poems?q=${encodeURIComponent(tag)}`,
    color: 'from-gray-500/10 to-slate-500/10',
    accentColor: 'text-gray-600'
  };
}

// 获取所有精选主题
export function getAllCollections() {
  const collections = [];
  
  for (const [category, tags] of Object.entries(tagCategories)) {
    for (const tag of tags.slice(0, 4)) { // 每个分类最多显示4个主题
      const config = generateCollectionFromTag(tag, category);
      if (config) {
        collections.push({
          id: tag,
          category,
          ...config
        });
      }
    }
  }
  
  return collections;
}
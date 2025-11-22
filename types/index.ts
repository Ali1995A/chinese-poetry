// 诗词核心接口定义
export interface Poem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  tags?: string[];
  notes?: string;
  translation?: string;
  background?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 作者信息接口
export interface Author {
  id: string;
  name: string;
  dynasty: string;
  description?: string;
  birthYear?: number;
  deathYear?: number;
  style?: string;
  representativeWorks?: string[];
}

// 搜索参数接口
export interface SearchParams {
  q?: string;
  dynasty?: string;
  author?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

// 分页响应接口
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 诗词卡片组件 Props
export interface PoemCardProps {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  tags?: string[];
  excerpt?: string;
  className?: string;
}

// 阅读器组件 Props
export interface PoemReaderProps {
  poem: Poem;
  className?: string;
}

// 导航项接口
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 字体配置
export interface FontConfig {
  serif: string;
  sans: string;
  display: string;
}

// 诗词分类
export interface PoemCategory {
  name: string;
  icon: React.ReactNode;
  count: string;
  href: string;
}
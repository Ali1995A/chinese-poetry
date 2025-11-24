import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '诗词搜索 - 诗云 Poetry Cloud',
  description: '智能诗词搜索平台，支持按标题、作者、内容、标签搜索唐诗、宋词、元曲等古典诗词作品。',
  keywords: '诗词搜索,智能搜索,唐诗搜索,宋词搜索,元曲搜索',
  openGraph: {
    title: '诗词搜索 - 诗云 Poetry Cloud',
    description: '智能诗词搜索平台，支持按标题、作者、内容、标签搜索唐诗、宋词、元曲等古典诗词作品。',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
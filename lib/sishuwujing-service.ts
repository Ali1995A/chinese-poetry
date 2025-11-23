/**
 * 四书五经数据加载服务
 */

import fs from 'fs';
import path from 'path';
import { SishuwujingChapter, SishuwujingData, SishuwujingPoem } from '../types/sishuwujing';
import { Poem } from '../types/poem';

export class SishuwujingService {
  private data: SishuwujingData | null = null;

  /**
   * 加载四书五经数据
   */
  async loadData(): Promise<SishuwujingData> {
    if (this.data) {
      return this.data;
    }

    try {
      const dataDir = path.join(process.cwd(), 'source_data', '四书五经');
      
      // 加载大学数据
      const daxuePath = path.join(dataDir, 'daxue.json');
      const daxueData: SishuwujingChapter = JSON.parse(
        fs.readFileSync(daxuePath, 'utf-8')
      );

      // 加载孟子数据
      const mengziPath = path.join(dataDir, 'mengzi.json');
      const mengziData: SishuwujingChapter[] = JSON.parse(
        fs.readFileSync(mengziPath, 'utf-8')
      );

      // 加载中庸数据
      const zhongyongPath = path.join(dataDir, 'zhongyong.json');
      const zhongyongData: SishuwujingChapter = JSON.parse(
        fs.readFileSync(zhongyongPath, 'utf-8')
      );

      this.data = {
        daxue: daxueData,
        mengzi: mengziData,
        zhongyong: zhongyongData
      };

      return this.data;
    } catch (error) {
      console.error('加载四书五经数据失败:', error);
      throw new Error('无法加载四书五经数据');
    }
  }

  /**
   * 获取所有四书五经数据
   */
  async getAllData(): Promise<SishuwujingData> {
    return this.loadData();
  }

  /**
   * 获取大学数据
   */
  async getDaxue(): Promise<SishuwujingChapter> {
    const data = await this.loadData();
    return data.daxue;
  }

  /**
   * 获取孟子数据
   */
  async getMengzi(): Promise<SishuwujingChapter[]> {
    const data = await this.loadData();
    return data.mengzi;
  }

  /**
   * 获取中庸数据
   */
  async getZhongyong(): Promise<SishuwujingChapter> {
    const data = await this.loadData();
    return data.zhongyong;
  }

  /**
   * 将四书五经数据转换为诗词格式
   */
  async convertToPoems(): Promise<SishuwujingPoem[]> {
    const data = await this.loadData();
    const poems: SishuwujingPoem[] = [];

    // 转换大学数据
    poems.push({
      id: `sishuwujing-daxue-1`,
      title: '大学',
      author: '曾子',
      dynasty: '春秋战国',
      content: data.daxue.paragraphs.join('\n'),
      type: 'sishuwujing',
      source: 'daxue',
      chapter: data.daxue.chapter,
      paragraphs: data.daxue.paragraphs
    });

    // 转换孟子数据
    data.mengzi.forEach((chapter, index) => {
      poems.push({
        id: `sishuwujing-mengzi-${index + 1}`,
        title: `孟子·${chapter.chapter}`,
        author: '孟子',
        dynasty: '战国',
        content: chapter.paragraphs.join('\n'),
        type: 'sishuwujing',
        source: 'mengzi',
        chapter: chapter.chapter,
        paragraphs: chapter.paragraphs
      });
    });

    // 转换中庸数据
    poems.push({
      id: `sishuwujing-zhongyong-1`,
      title: '中庸',
      author: '子思',
      dynasty: '春秋战国',
      content: data.zhongyong.paragraphs.join('\n'),
      type: 'sishuwujing',
      source: 'zhongyong',
      chapter: data.zhongyong.chapter,
      paragraphs: data.zhongyong.paragraphs
    });

    return poems;
  }

  /**
   * 搜索四书五经内容
   */
  async search(query: string): Promise<SishuwujingPoem[]> {
    const poems = await this.convertToPoems();
    const lowerQuery = query.toLowerCase();
    
    return poems.filter(poem => 
      poem.title.toLowerCase().includes(lowerQuery) ||
      poem.content.toLowerCase().includes(lowerQuery) ||
      poem.chapter?.toLowerCase().includes(lowerQuery) ||
      poem.author.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * 根据ID获取四书五经内容
   */
  async getById(id: string): Promise<SishuwujingPoem | null> {
    const poems = await this.convertToPoems();
    return poems.find(poem => poem.id === id) || null;
  }

  /**
   * 获取四书五经统计信息
   */
  async getStats(): Promise<{
    totalChapters: number;
    totalParagraphs: number;
    sources: {
      daxue: number;
      mengzi: number;
      zhongyong: number;
    };
  }> {
    const data = await this.loadData();
    
    const daxueParagraphs = data.daxue.paragraphs.length;
    const mengziParagraphs = data.mengzi.reduce((sum, chapter) => sum + chapter.paragraphs.length, 0);
    const zhongyongParagraphs = data.zhongyong.paragraphs.length;
    
    return {
      totalChapters: 1 + data.mengzi.length + 1, // 大学 + 孟子章节数 + 中庸
      totalParagraphs: daxueParagraphs + mengziParagraphs + zhongyongParagraphs,
      sources: {
        daxue: daxueParagraphs,
        mengzi: mengziParagraphs,
        zhongyong: zhongyongParagraphs
      }
    };
  }
}

// 创建单例实例
export const sishuwujingService = new SishuwujingService();
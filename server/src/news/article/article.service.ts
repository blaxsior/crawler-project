import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
  ) {}

  async create(data: Omit<Article, 'contents' | 'keyword' | 'id'>) {
    const article = this.articleRepo.create({
      title: data.title,
      publishedAt: data.publishedAt,
      author: data.author,
      url: data.url,
      body: data.body,
      keyword_id: data.keyword_id,
    });

    return await this.articleRepo.save(article);
  }
  /**
   * @param keyword_id 기사 대상이 되는 키워드
   * @param eager comment와 join해서 가져올지 여부
   * @returns keyword_id와 관련된 기사 리스트
   */
  async findManyByKeywordId(keyword_id: number, eager = false) {
    if (keyword_id == null) {
      return [];
    }
    const articles = await this.articleRepo.find({
      where: { keyword_id },
      relations: eager ? ['comments'] : undefined,
    });
    return articles;
  }
  /**
   * @param id 기사의 id 값
   * @param eager comment와 join해서 가져올지 여부
   * @returns 대응되는 기사 또는 null
   */
  async findById(id: number, eager = false) {
    if (id == null) {
      return null;
    }
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: eager ? ['comments'] : undefined,
    });
    return article;
  }

  async deleteById(id: number) {
    const result = await this.articleRepo.delete(id);
    return result.affected;
  }
}

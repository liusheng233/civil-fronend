export interface RepostedContent {
  /**
   * 转载内容ID，主键，自增
   */
  contentId: number;
  content: string;
  author: string;

  /**
   * 文章ID，逻辑关联BYH_A_ARTICLES表的ARTICLE_ID
   */
  articleId: number;

  /**
   * 转载文章标题
   */
  republishedTitle: string;

  /**
   * 转载文章内容，富文本格式
   */
  contentUrl: string;

  /**
   * 是否为原文
   */
  original: number;

  /**
   * 浏览量
   */
  viewCount: number;

  /**
   * 来源网站名称
   */
  sourceName: string;

  /**
   * 来源网站地址
   */
  sourceUrl: string;

  /**
   * 原文发表日期
   */
  originDate: Date;

  /**
   * 转载状态：0，编辑中。1，发布到审核。2，审核成功。3：审核打回
   */
  status: number;

  /**
   * 打回原因
   */
  reason: string;

  /**
   * 版本
   */
  version: number;

  /**
   * 转载用户id
   */
  repostedUserId: number;

  /**
   * 创建时间
   */
  creationDate: Date;

  /**
   * 更新时间
   */
  updateDate: Date;

  /**
   * 是否删除
   */
  isDeleted: number;

  /**
   * 预上传板块
   */
  rankPartId: number;

  /**
   * 预计上传等级
   */
  rankPartLevel: number;

  /**
   * 预计上传类别：create/update/delete,0/1/2
   */
  rankPartMethod: number;

  /**
   * 转载文章标题图片地址
   */
  republishedTitleImgUrl: string;
}

export interface Page<T> {
  total: number;
  records: T[];
  size: number;
  current: number;
  orders: any[];
}

export interface IndexRanksPart {
  rankPartId: number;
  rankPartName: string;
  rankPartEnName: string;
  updateTime: Date;
  createTime: Date;
  isDelete: number;
  repostedContents: Array<RepostedContent>;
}

export interface RepostedContent {
  contentId: number | null;
  articleId: number | null;
  republishedTitle: string | null;
  contentUrl: string | null;
  original: number | null;
  viewCount: number | null;
  sourceName: string | null;
  sourceUrl: string | null;
  originDate: Date | null; // Date 类型也可以为 null，尽管在 JavaScript 中不太常见
  status: number | null;
  reason: string | null;
  version: number | null;
  repostedUserId: number | null;
  creationDate: Date | null;
  updateDate: Date | null;
  isDeleted: number | null;
  rankPartId: number | null;
  rankPartLevel: number | null;
  rankPartMethod: number | null;
  republishedTitleImgUrl: string | null;
}

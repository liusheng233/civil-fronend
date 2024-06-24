import { get, post } from '@/utils/http/axios';
import { Page, RepostedContent } from '@/api/article/type';
// import axios from 'axios';
enum URL {
  articlesDetail = '/article/articles/',
  repostedContentsByRankPart = '/article/rankparts/',
}

const getArticlesDetail = async (id: number) => get<RepostedContent>({ url: URL.articlesDetail + id });
const getRepostedContentsPageByRankPart = async (id: number, page: Page<RepostedContent>) =>
  post<Page<RepostedContent>>({ url: URL.repostedContentsByRankPart + id + '/articles', data: page });
export { getArticlesDetail, getRepostedContentsPageByRankPart };

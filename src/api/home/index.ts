import { get } from '@/utils/http/axios';
import { IndexRanksPart } from '@/api/home/types';
// import axios from 'axios';
enum URL {
  indexRanks = '/rank/allRankparts',
  rankPart = '/rank/rankparts/',
}

const getIndexRanks = async () => get<IndexRanksPart[]>({ url: URL.indexRanks });
const getIndexRanksById = async (id: number) => get<IndexRanksPart>({ url: URL.rankPart + id });
export { getIndexRanks, getIndexRanksById };

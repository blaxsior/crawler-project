import axios from 'axios';
import { validateNewsCommentsObj } from '../util/validation';
import { getBaseUrl } from './util';

// apis.naver.com/commentBox/cbox/web_naver_list_jsonp.json?
// ticket=news
// pool=cbox5
// lang=ko
// country=KR
// objectId=news005%2C0001631566
// pageSize=20
// indexSize=10
// pageType=more
// sort=favorite

const options: Record<string, string> = {
  ticket: 'news',
  pool: 'cbox5',
  lang: 'ko',
  country: 'KR',
  pageSize: '20',
  indexSize: '10',
  pageType: 'more',
  sort: 'favorite',
};
const path = 'https://apis.naver.com/commentBox/cbox/web_naver_list_jsonp.json';

export function getNewsId(address: string) {
  const params = new URL(address).pathname.split('/').slice(-2);
  return 'news' + params.join(',');
}

export function removeFunctionCall(data: string) {
  const match = data.match(/_callback\((\{.*\})\)/);
  return match ? match[1] : null;
}

export async function getNewsCommentsObject(
  newsAddr: string,
  commentsAddr: string,
  pno = 1,
  next = '',
) {
  const cmaddr = `${commentsAddr}&page=${pno}&moreParam.next=${next ?? ''}`;

  const req = await axios.get<string>(cmaddr, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/98.0.4758.102',
      Referer: newsAddr,
    },
  });
  if (!req.data) throw new Error(`ERROR[no data]: ${cmaddr}`);
  const json = removeFunctionCall(req.data);
  return JSON.parse(json);
}

export async function getNewsComments(newsAddr: string) {
  const id = getNewsId(newsAddr);
  //objectId, page, moreParam.next는 각 API에서 추가해야 함
  const commentAddr = getBaseUrl(path, options, { objectId: id });
  const comments: Comment[] = [];
  let next = '';
  let page = 1;
  const limit = 10;
  while (page < limit) {
    const data = await getNewsCommentsObject(newsAddr, commentAddr, page, next);
    const pageCommentList = getNewsCommentsFromCommentsObj(data);
    comments.push(...pageCommentList);
    page++;
    next = data.result.morePage.next;
    if (page === data.result.pageModel.lastPage) {
      break;
    }
  }
  return comments;
}

function getNewsCommentsFromCommentsObj(data: any): Comment[] {
  validateNewsCommentsObj(data);

  const commentObjs = data.result.commentList.map((it) => ({
    contents: it.contents,
    sympathyCount: it.sympathyCount,
    antipathyCount: it.antipathyCount,
  }));
  return commentObjs;
}

interface Comment {
  content: string;
  sympathyCount: number;
  antipathyCount: number;
}

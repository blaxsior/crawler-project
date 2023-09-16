import { getNewsBody } from './body';
import { getNewsComments } from './comments';
import { getNewsLinkList } from './list';
import { getDateYTString } from './util';

export async function getNewsAndCommentResults(
  keyword: string,
  idlist: string[],
) {
  const dates = getDateYTString();
  // '1020', '1025', '1005', '1023', '1032'
  const urlList: string[] = [];
  // const start = new Date();
  for (const office_id of idlist) {
    const urls = await getNewsLinkList({
      ds: dates.yesterday,
      de: dates.today,
      query: keyword,
      news_office_checked: office_id,
    });
    urlList.push(...urls);
  }

  const result: {
    url: string;
    news: Awaited<ReturnType<typeof getNewsBody>>;
    comments: Awaited<ReturnType<typeof getNewsComments>>;
  }[] = [];
  for (const addr of urlList) {
    //스포츠 기사 등 제외, 순수 기사만 채택
    if (!addr.startsWith('https://n.news.naver.com')) continue;
    try {
      const news = await getNewsBody(addr);
      const comments = await getNewsComments(addr);
      result.push({
        url: addr,
        news: news,
        comments: comments,
      });
    } catch (e) {
      console.log(e);
    }
  }
  // const timelapseSec = (Date.now() - start.getTime()) / 1000;
  // const count = result.length;
  // console.log('경과 시간: ', timelapseSec);
  // console.log('기사 개수: ', count);
  // console.log('기사 당 경과 시간: ', timelapseSec / count);
  // console.log(
  //   '총 댓글 개수: ',
  //   result.map((it) => it.comments.length).reduce((a, b) => a + b, 0),
  // );
  // console.log('done!');
  return result;
}

// 예시 사용 방식
// (async () => {
//   const idlist = ['1002', '1020', '1025', '1005', '1023', '1032'];
//   const keyword = '윤석열';
//   const result = await getNewsAndCommentResults(keyword, idlist);

//   await writeFile('testtt.json', JSON.stringify(result));
//   console.log('done!');
// })();

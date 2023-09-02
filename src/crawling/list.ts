import axios from 'axios';
import { HTMLElement, parse } from 'node-html-parser';
import { getBaseUrl } from './util';
// where=news
// query=검색어

// sort=0, 1, 2 => 절렬 기준이 뭔지. nso의 so 옵션과 동일
// ds=2023.08.31.10.23
// de=2023.09.01.10.23

// office_type=1 언론사 별 검색 사용하는 경우
// mynews=1 언론사 별 검색 사용하는 경우 필요
// news_office_checked=1032: 언론사 번호

// nso=so:dd,p:1d,a:all
// so: 정렬 r = 관련도, dd = 최신
// p: 기간
// start=11
// 기간만 적어두면 nso 옵션도 딱히 필요 없음

// 변경하는 부분
// ds: 시작일
// de: 끝일
// news_office_checked: 언론사 번호
// start: 시작 번호(페이지)

//
// div.info_group > a:nth-child(3)

const options: Record<string, string> = {
  where: 'news',
  nso: 'so:dd,p:1d,a:all',
};

const path = 'https://search.naver.com/search.naver';

/**
 * @param options 추가적으로 필요한 옵션
 */
export async function getNewsLinkList(variable_options: {
  query: string;
  ds: string;
  de: string;
  news_office_checked?: string;
}) {
  //내부적으로는 start 옵션만 변경됨
  if (variable_options.news_office_checked) {
    variable_options['office_type'] = '1';
    variable_options['mynews'] = '1';
  }
  const baseUrl = getBaseUrl(path, options, variable_options);
  let count = 1;
  let root: HTMLElement;

  const link_list: string[] = [];
  // console.log(baseUrl);
  // console.log(`${baseUrl}&start=${count}`);
  do { // not found 페이지가 나오기 전까지 계속 탐색하기.
    const req = await axios.get(`${baseUrl}&start=${count}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/98.0.4758.102',
      },
    });
    count += 10;

    if (!req) return null;

    root = parse(req.data);
    const targets = root.querySelectorAll('div.info_group a:nth-child(3)');
    for (const target of targets) {
      const link = target.getAttribute('href');
      console.log(target.getAttribute('href'));
      link_list.push(link);
    }
  } while (root.querySelector('div.info_group') != null);
  return link_list;
}

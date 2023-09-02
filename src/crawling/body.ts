import axios from 'axios';
import { parse } from 'node-html-parser';
import { validateNotEmpty } from '../util/validation';

export async function getNewsBody(address: string) {
  const req = await axios.get(address, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/98.0.4758.102',
    },
  });
  const root = parse(req.data);

  let title = '';
  let author = '';
  let newsParagraphs: string[] = [];

  // title
  const titleElement = root.querySelector('h2.media_end_head_headline');
  validateNotEmpty(titleElement);
  title = titleElement.textContent;

  // author
  const authorElement = root.querySelector('em.media_end_head_journalist_name');
  validateNotEmpty(authorElement);
  author = authorElement.textContent;
  // body
  const articleElement = root.querySelector('article');
  validateNotEmpty(articleElement);
  //https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  //TextNode (Node.TEXT_NODE 참고)
  //TextNode의 텍스트만 가져오기
  newsParagraphs = articleElement.childNodes
    .filter((node) => node.nodeType === 3) // Text 노드는 노드 타입이 3
    .map((it) => it.textContent.trim());

  return {
    title,
    author,
    body: newsParagraphs,
  };
}
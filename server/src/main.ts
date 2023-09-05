import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getNewsBody } from './crawling/body';
import { getNewsComments } from './crawling/comments';
import { getNewsLinkList } from './crawling/list';
import { getDateString, getDateYTString } from './crawling/util';

// import { getNewsBody } from './crawling/body';
// import { getNewsComments } from './crawling/comments';
// import { getDateYTString } from './crawling/util';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

(async () => {
  const dates = getDateYTString();
  const idlist = ['1002', '1023', '1032'];
  //'1020', '1025', '1005'
  const urlList = [];
  for (const office_id of idlist) {
    const urls = await getNewsLinkList({
      ds: dates.yesterday,
      de: dates.today,
      query: '윤석열',
      news_office_checked: office_id,
    });
    urlList.push(...urls);
  }

  for (const url of urlList) {
    const news = await getNewsBody(url);
    const comments = await getNewsComments(url);
  }
  // for (const addr of urls) {
  //   const news = await getNewsBody(addr);
  //   const comments = await getNewsComments(addr);
  //   console.log(comments);
  // }
})();

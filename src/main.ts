import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import { getNewsBody } from './crawling/body';
// import { getNewsComments } from './crawling/comments';
// import { getDateYTString } from './crawling/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// (async () => {
//   const addr = 'https://n.news.naver.com/article/005/0001631566';
//   // const news = await getNewsBody(addr);
//   // console.log(news);
//   const comments = await getNewsComments(addr);
//   console.log(comments);
// })();

// (async () => {
//   const dates = getDateYTString();
//   // const link_list = await getNewsLinkList({
//   //   query: '윤석열',
//   //   ds: dates.yesterday,
//   //   de: dates.today,
//   //   news_office_checked: '1032',
//   // });
//   const link_list = [
//     'https://n.news.naver.com/mnews/article/032/0003246478?sid=100',
//   ];
//   for (const link of link_list.slice(0, 1)) {
//     const news = await getNewsBody(link);
//     const comments = await getNewsComments(link);
//     console.log(news, comments);
//   }
// })();

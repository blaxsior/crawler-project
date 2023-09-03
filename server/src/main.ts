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

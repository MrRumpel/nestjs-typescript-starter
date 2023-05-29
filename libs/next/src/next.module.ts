import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { NextServerOptions } from 'next/dist/server/next';
import { NextMiddleware } from './next.middleware';
import { createNextServer } from './next.provider';
import { NextService } from './next.service';

@Module({})
export class NextModule implements NestModule {
  static forRoot(nextServerOptions: NextServerOptions): DynamicModule {
    const nextServer = createNextServer(nextServerOptions);
    return {
      module: NextModule,
      providers: [nextServer],
      controllers: [NextHandlerConrtoller],
      exports: [nextServer],
    };
  }
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(NextMiddleware).forRoutes('*');
  }
}

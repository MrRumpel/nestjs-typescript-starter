import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextServer } from 'next/dist/server/next';
import { NextRequest, NextResponse } from 'next/server';

@Injectable()
export class NextMiddleware
  implements NestMiddleware<NextRequest, NextResponse>
{
  constructor(@Inject(NextServerToken) private nextServer: NextServer) {}

  //方便上下文使用到nextServer
  use(req: NextRequest, res: NextResponse, next: () => void): void {
    res.nextServer = this.nextServer;
    res.nextRender = this.nextServer.render.bind(this.nextServer, req, res);
    res.nextRequestHandler = this.nextServer.getRequestHandler();
    next();
  }
}

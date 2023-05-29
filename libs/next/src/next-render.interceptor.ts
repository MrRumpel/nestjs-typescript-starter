import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { NextRequest, NextResponse } from 'next/server';
import { Observable } from 'rxjs';

@Injectable()
export class NextRenderInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Observable<any> {
    const req: NextRequest = context.switchToHttp().getRequest();
    const res: NextResponse = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data: any, message) => {
        if (Reflect.getMetadata(NEXT_HANDLER, context.getClass())) {
          //重要！！ next非页面请求走这里
          return data;
        } else if (
          Reflect.hasMetadata(NEXT_URL_ITEMS_METADATA, context.getHandler())
        ) {
          //重要！！ next页面请求走这里
          const url = req.url?.includes('?')
            ? req.url + '&' + json2url(data)
            : req.url + '?' + json2url(data);
          //组和了
          let parsedUrl = parse(url, true);
          let { pathname, query } = parsedUrl;
          req.url = url;
          return res.nextServer.render(req, res, pathname, query);
        } else {
          if (typeof data === 'object' && 'error' in data) {
            return data['error'];
          }
          return {
            code: 1,
            msg: message || 'success',
            data: data,
          };
        }
      }),
    );
  }
}

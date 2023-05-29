export const NextParam = createParamDecorator((key: string, ctx: ExecutionContext): any => {
  const request: Request = ctx.switchToHttp().getRequest();
  const root = Reflect.getMetadata(PATH_METADATA, ctx.getClass());
  const path = Reflect.getMetadata(PATH_METADATA, ctx.getHandler());
  const items = Reflect.getMetadata(NEXT_URL_ITEMS_METADATA, ctx.getHandler());
  //简单处理下完整的nest url
  const _url = root === "/" ? path : `/${root.replace('/', '')}${path}`;
  //因为可以保证只有一个*，所以只需做如下处理
  const regexp = pathToRegexp(_url.replace("*", "(.*)"));
  const results = regexp.exec(request.url);
  let paramIndex = 0;
  const params: {[key: string]: string | string[]} = {};
  //根据之前文件名解析的结果，解析url所带的参数
  for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if(item.isParam) {
          paramIndex++;
      }
      if(item.isParam) {
          if(item.optional) {
              params[item.key] = results[paramIndex].split('/')
          }else {
              params[item.key] = results[paramIndex];
          }
      }
  }
  return key ? params[key] : params;
}
);


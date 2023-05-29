import { applyDecorators, RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { nextUrlAnalysis } from './nextUrlAnalysis';

export function NextRender() {
  return applyDecorators(function (target, key: string, descriptor) {
    const items = nextUrlAnalysis(key);
    let path: string = '/';
    //生成nest Get请求支持的路径
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (path.length === 0 || path[path.length - 1] !== '/') {
        path += '/';
      }
      if (item.key === 'index') {
        if (i !== items.length - 1) {
          path += item.key;
        }
      } else if (item.optional) {
        if (i !== items.length - 1) {
          //可选参数只能放在最后一个/之后
          throw new Error('next optional param must be at the tail of url');
        }
        path += '*';
      } else if (item.isParam) {
        path += `:${item.key}`;
      } else {
        path += item.key;
      }
    }

    const requestMethod = RequestMethod.GET;
    //Get请求相关
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    //为后续如需参数解析，把先前文件名解析结果存下来
    Reflect.defineMetadata(NEXT_URL_ITEMS_METADATA, items, descriptor.value);
    return descriptor;
  });
}

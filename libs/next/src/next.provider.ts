import { FactoryProvider } from '@nestjs/common';
import { NextServer, NextServerOptions } from 'next/dist/server/next';

export const createNextServer = (
  nextServerOptions: NextServerOptions,
): FactoryProvider<Promise<NextServer>> => ({
  provide: NextServerToken,
  useFactory: async () => {
    //创建Next实例
    const nextServer = Next(nextServerOptions);

    await nextServer.prepare();
    return nextServer;
  },
});

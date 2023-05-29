import { Controller, Get, Req, Res } from '@nestjs/common';
import { NextRequest, NextResponse } from 'next/server';

@Controller('_next')
export class NextHandlerConrtoller {
  @Get('*')
  allHandler(@Req() req: NextRequest, @Res() res: NextResponse) {
    console.log('next handler', req.url);
    return res?.nextRequestHandler(req, res);
  }
}

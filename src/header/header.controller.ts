import {
  Controller,
  Get,
  Param,
  Inject,
  Res,
  HttpStatus,
  Header,
  UseFilters,
} from '@nestjs/common';
import { Menu } from './interfaces';
import { MenuService } from './services/menu/menu.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Response } from 'express';
import { EBDExceptionFilter } from '../utils/exception.filter';

@Controller('ebd/header')
@UseFilters(new EBDExceptionFilter())
export class HeaderController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly menuService: MenuService,
  ) {}

  @Get('menu')
  async getMenus(): Promise<Menu[]> {
    const menus = await this.menuService.getAllMenus();
    this.logger.info(`header/menu -> ${JSON.stringify(menus)}`);
    return menus;
  }

  //在https response中增加status的实现方式
  @Get('menu2')
  async getMenus2(@Res() res: Response) {
    const menus = await this.menuService.getAllMenus();
    this.logger.info(`header/menu2 -> ${JSON.stringify(menus)}`);
    res.status(HttpStatus.OK).json(menus);
  }

  //在https response中增加header】的实现方式
  @Get('menu3')
  @Header('my-header', 'hello')
  async getMenus3(): Promise<Menu[]> {
    const menus = await this.menuService.getAllMenus();
    this.logger.info(`header/menu -> ${JSON.stringify(menus)}`);
    return menus;
  }

  //测试exception filter
  @Get('error')
  throwError() {
    throw new Error('some error');
  }

  @Get()
  findAll(): string {
    return 'All Items';
  }
  @Get(':id')
  findById(@Param() param): string {
    return param.id;
  }
}

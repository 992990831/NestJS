import { Controller, Get, Param, Inject } from '@nestjs/common';
import { Menu } from './interfaces';
import { MenuService } from './services/menu/menu.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('header')
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

  @Get()
  findAll(): string {
    return 'All Items';
  }
  @Get(':id')
  findById(@Param() param): string {
    return param.id;
  }
}

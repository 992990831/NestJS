import { Module } from '@nestjs/common';
import { HeaderController } from './header.controller';
import { MenuService } from './services/menu/menu.service';

@Module({
  imports: [],
  controllers: [HeaderController],
  providers: [MenuService],
})
export class HeaderModule {}

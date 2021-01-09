import { Injectable } from '@nestjs/common';
import { Menu } from '../../interfaces';

@Injectable()
export class MenuService {
  getAllMenus(): Promise<Menu[]> {
    const response = new Promise<Menu[]>((resolve, reject) => {
      setTimeout(() => {
        try {
          const menus: Menu[] = [];
          menus.push({ displayText: 'AAA', link: 'BBB' });
          resolve(menus);
        } catch {
          reject();
        }
      }, 1000);
    });

    return response;
  }
}

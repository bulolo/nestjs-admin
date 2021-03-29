import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        MenuController,],
    providers: [
        MenuService,],
})
export class MenuModule { }

import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    TenantController,],
  providers: [
    TenantService,],
})
export class TenantModule { }

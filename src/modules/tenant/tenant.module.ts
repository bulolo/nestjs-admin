import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  controllers: [
    TenantController,],
  providers: [
    TenantService,],
})
export class TenantModule { }

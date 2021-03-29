// BaseService.ts
import { Repository, DeleteResult, SaveOptions, FindConditions, RemoveOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Injectable } from "@nestjs/common";

/**
 * 服务基类,实现一些共有的基本方法,这样就不用每个服务类在写一遍了,直接继承该类即可
 */
@Injectable() 
export class BaseService<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async saveOne(entity: T, options?: SaveOptions): Promise<T> {
        return this.repository.save(entity, options);
    }

    async saveMany(entities: T[], options?: SaveOptions): Promise<T[]> {
        return this.repository.save(entities, options);
    }

    async findOne(options?: FindConditions<T>): Promise<T> {
        return this.repository.findOne(options);
    }

    async findMany(options?: FindConditions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async removeOne(entity: T, options?: RemoveOptions): Promise<T> {
        return this.repository.remove(entity, options);
    }

    async removeMany(entities: T[], options?: RemoveOptions): Promise<T[]> {
        return this.repository.remove(entities, options);
    }

    async delete(options?: FindConditions<T>): Promise<DeleteResult> {
        return this.repository.delete(options);
    }

    async update(conditions: number | FindConditions<T>, newValue: QueryDeepPartialEntity<T>): Promise<number> {
        let updateResult = 1;
        await this.repository.update(conditions, newValue).catch(e => updateResult = 0);
        return updateResult;
    }
}
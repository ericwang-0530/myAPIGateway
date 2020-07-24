import {DefaultCrudRepository} from '@loopback/repository';
import {TestModel, TestModelRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TestModelRepository extends DefaultCrudRepository<
  TestModel,
  typeof TestModel.prototype.id,
  TestModelRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TestModel, dataSource);
  }
}

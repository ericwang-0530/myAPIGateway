import {Entity, model, property} from '@loopback/repository';

@model()
export class TestModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;


  constructor(data?: Partial<TestModel>) {
    super(data);
  }
}

export interface TestModelRelations {
  // describe navigational properties here
}

export type TestModelWithRelations = TestModel & TestModelRelations;

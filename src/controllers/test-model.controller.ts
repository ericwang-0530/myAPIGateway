import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TestModel} from '../models';
import {TestModelRepository} from '../repositories';

export class TestModelController {
  constructor(
    @repository(TestModelRepository)
    public testModelRepository : TestModelRepository,
  ) {}

  @post('/test-model', {
    responses: {
      '200': {
        description: 'TestModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(TestModel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestModel, {
            title: 'NewTestModel',
            exclude: ['id'],
          }),
        },
      },
    })
    testModel: Omit<TestModel, 'id'>,
  ): Promise<TestModel> {
    return this.testModelRepository.create(testModel);
  }

  @get('/test-model/count', {
    responses: {
      '200': {
        description: 'TestModel model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TestModel) where?: Where<TestModel>,
  ): Promise<Count> {
    return this.testModelRepository.count(where);
  }

  @get('/test-model', {
    responses: {
      '200': {
        description: 'Array of TestModel model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TestModel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TestModel) filter?: Filter<TestModel>,
  ): Promise<TestModel[]> {
    return this.testModelRepository.find(filter);
  }

  @patch('/test-model', {
    responses: {
      '200': {
        description: 'TestModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestModel, {partial: true}),
        },
      },
    })
    testModel: TestModel,
    @param.where(TestModel) where?: Where<TestModel>,
  ): Promise<Count> {
    return this.testModelRepository.updateAll(testModel, where);
  }

  @get('/test-model/{id}', {
    responses: {
      '200': {
        description: 'TestModel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TestModel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TestModel, {exclude: 'where'}) filter?: FilterExcludingWhere<TestModel>
  ): Promise<TestModel> {
    return this.testModelRepository.findById(id, filter);
  }

  @patch('/test-model/{id}', {
    responses: {
      '204': {
        description: 'TestModel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestModel, {partial: true}),
        },
      },
    })
    testModel: TestModel,
  ): Promise<void> {
    await this.testModelRepository.updateById(id, testModel);
  }

  @put('/test-model/{id}', {
    responses: {
      '204': {
        description: 'TestModel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testModel: TestModel,
  ): Promise<void> {
    await this.testModelRepository.replaceById(id, testModel);
  }

  @del('/test-model/{id}', {
    responses: {
      '204': {
        description: 'TestModel DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testModelRepository.deleteById(id);
  }
}

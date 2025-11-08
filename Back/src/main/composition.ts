import SQLiteExampleRepository from '../repositories/SQLiteExampleRepository';
import ExampleUseCase from '../use-cases/ExampleUseCase';

export function createExampleUseCase() {
  const repo = new SQLiteExampleRepository();
  const useCase = new (ExampleUseCase as any)(repo);
  return { repo, useCase };
}

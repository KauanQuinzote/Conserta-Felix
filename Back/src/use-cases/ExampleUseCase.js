class ExampleUseCase {
  constructor(exampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  async list() {
    return this.exampleRepository.list();
  }

  async create(data) {
    const entity = { id: Date.now().toString(), ...data };
    return this.exampleRepository.create(entity);
  }
}

module.exports = ExampleUseCase;

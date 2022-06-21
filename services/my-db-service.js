export class CrudService {
  constructor(repository) {
    this.repository = repository;
  }
  create = async (body) => await this.repository.create(body);
  save = async (data) => await this.repository.save(data);
  getAll = async () => await this.repository.getAll();
}

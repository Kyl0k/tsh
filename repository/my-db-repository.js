export class CrudRepository {
  constructor(instance) {
    this.instance = instance;
  }
  create = async (body) => await this.instance.create(body);
  save = async (data) => await this.instance.save(data);
  getAll = async () => await this.instance._loadData();
}

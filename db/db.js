import { readFile, writeFile } from 'fs/promises';

export class Db {
  constructor(model, dataPath) {
    this.model = model;
    this.dataPath = dataPath;
  }
  _loadData = async () => JSON.parse(await readFile(this.dataPath, 'utf-8'));
  create = async (body) => new this.model(body);
  save = async (data) => {
    const allMovies = await this._loadData();
    const id =
      allMovies.reduce((prev, curr) => (prev.id > curr.id ? prev : curr), {})
        .id + 1;
    data.id = id;
    const movieIndex = allMovies.push(data) - 1;
    await writeFile(this.dataPath, JSON.stringify(allMovies), 'utf8');
    return allMovies[movieIndex];
  };
}

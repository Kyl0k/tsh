import { CrudRepository } from './my-db-repository.js';

export class MovieRepository extends CrudRepository {
  constructor(Movie) {
    super(Movie);
  }
}

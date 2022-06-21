import { Db } from '../db/db.js';

import { MovieRepository } from '../repository/movies-repository.js';
import { MovieService } from '../services/movies-service.js';
import { Movie } from '../models/Movie.js';

const movieService = new MovieService(
  new MovieRepository(new Db(Movie, './data/movies.json')),
);
export { movieService };

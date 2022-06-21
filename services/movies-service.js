import lodash from 'lodash';
import { CrudService } from './my-db-service.js';
import { filterByDuration } from '../utils/movie-utils.js';

const { intersection } = lodash;

export class MovieService extends CrudService {
  constructor(movieRepository) {
    super(movieRepository);
  }
  getRandomMovie = async ({ duration } = {}) => {
    const allMovies = await this.getAll();
    if (duration) {
      const filteredMovies = filterByDuration(allMovies, duration);
      const randomIndex = Math.floor(Math.random() * filteredMovies.length);
      console.log(randomIndex);
      return filteredMovies[randomIndex];
    }
    const randomIndex = Math.floor(Math.random() * allMovies.length);
    return allMovies[randomIndex];
  };
  getMoviesByGenres = async (genres) =>
    (await this.getAll()).filter((movie) =>
      movie.genres.some((genre) => genres.indexOf(genre) !== -1),
    );

  getMovies = async ({ genres, duration }) => {
    let movies;
    if (duration) {
      const allMovies = await this.getMoviesByGenres(genres);
      movies = filterByDuration(allMovies, duration);
    } else {
      movies = await this.getMoviesByGenres(genres);
    }
    movies.sort((movA, movB) => {
      const movieA = intersection(movA.genres, genres);
      const movieB = intersection(movB.genres, genres);
      if (movieB.length - movieA.length === 0) {
        return movieB[0] > movieA[0] ? -1 : 1;
      }
      return movieB.length - movieA.length;
    });
    return movies;
  };
}

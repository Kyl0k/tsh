import { movieService } from '../config/services-config.js';
import { convertGenres } from '../utils/movie-utils.js';

class MovieController {
  constructor(movieService) {
    this.movieService = movieService;
  }
  createMovie = async (req, res) => {
    const { body } = req;
    body.year.toString();
    body.runtime.toString();
    const movie = await this.movieService.create(body);
    const data = await this.movieService.save(movie);
    return res.status(201).json({ data });
  };
  getMovies = async (req, res) => {
    const { duration, genres } = req.query;
    const parsedDuration = parseInt(duration);
    const convertedGenres = convertGenres(genres);
    let movies = {};
    if (!isNaN(parsedDuration) && !genres) {
      movies = await this.movieService.getRandomMovie({
        duration: parsedDuration,
      });
    } else if (convertedGenres.length > 0 && isNaN(parsedDuration)) {
      movies = await this.movieService.getMovies({ genres: convertedGenres });
    } else if (convertedGenres.length > 0 && !isNaN(parsedDuration)) {
      movies = await this.movieService.getMovies({
        genres: convertedGenres,
        duration: parsedDuration,
      });
    } else {
      movies = await this.movieService.getRandomMovie();
    }
    return res.status(200).json({
      data: movies,
      moviesCount: movies.length,
    });
  };
}

export default new MovieController(movieService);

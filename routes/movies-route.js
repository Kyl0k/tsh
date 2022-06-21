import { validate } from 'express-validation';
import moviesController from '../controllers/movies-controller.js';
import { validation } from '../utils/movie-utils.js';

export default (movieRouter) => {
  movieRouter
    .route('/')
    .get(moviesController.getMovies)
    .post(validate(validation.createMovie), moviesController.createMovie);
};

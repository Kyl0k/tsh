import Joi from 'joi';
import { GENRES } from './constants.js';

const validation = {
  createMovie: {
    body: Joi.object({
      genres: Joi.array().items(Joi.string().valid(...GENRES)),
      title: Joi.string().max(255).required(),
      year: Joi.number().required(),
      runtime: Joi.number().min(1).required(),
      director: Joi.string().max(255).required(),
      actors: Joi.string(),
      plot: Joi.string(),
      posterUrl: Joi.string().uri(),
    }),
  },
};

const filterByDuration = (movies, duration) =>
  movies
    .map((movie) => {
      parseInt(movie.runtime);
      return movie;
    })
    .filter(
      (movie) =>
        movie.runtime <= duration + 10 && movie.runtime >= duration - 10,
    );

const convertGenres = (genres) => {
  if (Array.isArray(genres)) {
    return genres
      .map((genre) =>
        GENRES.find(
          (constGenre) => constGenre.toLowerCase() == genre.toLowerCase(),
        ),
      )
      .filter((convertedGenre) => convertedGenre !== undefined);
  } else return [];
};
export { validation, filterByDuration, convertGenres };

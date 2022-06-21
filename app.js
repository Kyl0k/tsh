import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import 'express-async-errors';
import { NotFoundError } from './utils/errors/index.js';
import errorHandling from './middlewares/error-handling.js';

const registerRoutes = async (moduleName) => {
  const register = await import(moduleName);
  const router = new express.Router();
  register.default(router);
  return router;
};

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp({ whitelist: ['genres'] }));

app.use('/api/movies', await registerRoutes('./routes/movies-route.js'));
app.all('*', (req, res, next) => {
  throw new NotFoundError(
    'Page not found. Check if your link has the correct address',
  );
});
app.use(errorHandling);

export { app };

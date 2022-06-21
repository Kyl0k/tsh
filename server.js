import { ENVIRONMENT } from './utils/constants.js';
import { app } from './app.js';

if (!process.env.NODE_ENV) process.env.NODE_ENV = ENVIRONMENT.PRODUCTION;

console.log(`Environment: ${process.env.NODE_ENV}`);

app.listen(process.env.PORT || 5001, (error) => {
  if (error) {
    console.error(error);
    process.exit(-1);
  }
  console.log(`Listening on port ${process.env.PORT}`);
});

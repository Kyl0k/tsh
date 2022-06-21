import { BadRequestError } from '../utils/errors/error-badrequest.js';
import { ENVIRONMENT, ERROR_NAMES } from '../utils/constants.js';

const sendErrorDev = (err, res) => {
  console.error(err);
  return res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = async (err, req, res) => {
  if (err.isOperational)
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  if (err.isProgrammer) {
    console.error(err);
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }
  console.error(err);
  return res.status(500).json({
    error: {
      status: 'error',
      message: 'Something wrong happened',
    },
  });
};

const handleValidationError = (err) => {
  if (err.errors) {
    const errors = Object.values(err.errors).map((e) => {
      return e.message;
    });
    const message = `Invalid or missing data: ${errors.join(' ')}`;
    return new BadRequestError(message);
  }
  if (err.details?.body) {
    const message = `The path ${err.details.body[0].message}`;
    return new BadRequestError(message);
  }
  return err;
};

const handleSyntaxError = (err) => {
  if (err.expose && err.statusCode === 400)
    return new BadRequestError(
      'A Syntax Error has occurred. Make sure you are sending your JSON data in a correct way.',
    );
  return err;
};

const notCustomErrors = (err) => {
  if (err.name === ERROR_NAMES.VALIDATION_ERROR) {
    return handleValidationError(err);
  } else if (err.name === ERROR_NAMES.SYNTAX_ERROR) {
    return handleSyntaxError(err);
  } else {
    return err;
  }
};

export default async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === ENVIRONMENT.PRODUCTION) {
    if (!err.isCustom) {
      return await sendErrorProd(notCustomErrors(err), req, res);
    }
    return await sendErrorProd(err, req, res);
  }
  return sendErrorDev(err, res);
};

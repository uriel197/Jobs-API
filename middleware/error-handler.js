// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware

/********* COMMENTS ********

Note: This code deals with types of errors that are not listed in our errors folder.

*** 1: const { CustomAPIError } = require('../errors') is importing the CustomAPIError class from the file located at '../errors'.  When you use require('../errors'), it will look for the main entry point of the module (commonly an index.js file) in the specified directory. The content of that file determines what is actually imported.
If only one file in the /errors folder contains the CustomAPIError class, and it's not the main entry point of the module (or explicitly exported from an index.js file), the code you provided won't find it.

*** 2: We are using the express-async-errors package, which is a middleware for the Express.js framework in Node.js. It simplifies error handling in asynchronous routes by allowing you to write asynchronous code without explicitly wrapping it in a try-catch block. This middleware catches errors that occur in your route handlers and passes them to Express's default error handling.

*** 3: when an error occurs in your routes or middleware, it will be caught by the express-async-errors middleware, and then the control will be passed to your error handling middleware (error-handler.js). This middleware checks the type of error and sends an appropriate response based on its type, utilizing the error classes you've defined in the errors folder. mainly,  {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
so when the error-handler reads "if(err instanceof CustomAPIError)" is saying "if the error is associated with any of the error clases defined in the errors folder" do ...
*/
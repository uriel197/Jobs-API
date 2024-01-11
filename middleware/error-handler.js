const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware;

/********* COMMENTS ********

Note: const { CustomAPIError } = require('../errors') is importing the CustomAPIError class from the file located at '../errors'.  When you use require('../errors'), it will look for the main entry point of the module (commonly an index.js file) in the specified directory. The content of that file determines what is actually imported.
If only one file in the /errors folder contains the CustomAPIError class, and it's not the main entry point of the module (or explicitly exported from an index.js file), the code you provided won't find it.

*** 1: We are using the express-async-errors package, which is a middleware for the Express.js framework in Node.js. It simplifies error handling in asynchronous routes by allowing you to write asynchronous code without explicitly wrapping it in a try-catch block. This middleware catches errors that occur in your route handlers and passes them to Express's default error handling.

*** 2: when an error occurs in your routes or middleware, it will be caught by the express-async-errors middleware, and then the control will be passed to your error handling middleware (error-handler.js). This middleware checks the type of error and sends an appropriate response based on its type, utilizing the error classes you've defined in the errors folder. mainly,  {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
so when the error-handler reads "if(err instanceof CustomAPIError)" is saying "if the error is associated with any of the error clases defined in the errors folder" do ...
*/
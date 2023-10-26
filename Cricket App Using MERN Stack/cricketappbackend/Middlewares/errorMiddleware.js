function errorHandler(statusCode, err, req, res, next) {
  console.error(err.stack);

  if (res.headerSent) {
    return next(err);
  }

  console.log("Error Middleware Called");
  res.status(statusCode || 500).json({
    ok: false, //Set the "ok" field false for errors
    message: err.message,
  });
}

module.exports = errorHandler;

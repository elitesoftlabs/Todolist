const ApiResponse = require("../utils/response");

function errorHandler(err, req, res, next) {
  console.error(err); 
  return ApiResponse.error(
    res,
    err.status || 500,
    err.code || "INTERNAL_SERVER_ERROR",
    err.message || "Unexpected error occurred",
    process.env.NODE_ENV === "development" ? { stack: err.stack } : {}
  );
}

module.exports = errorHandler;

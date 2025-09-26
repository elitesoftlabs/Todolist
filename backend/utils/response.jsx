
class ApiResponse {
  static success(res, statusCode = 200, code = "OK", message = "Success", data = {}, meta = {}) {
    return res.status(statusCode).json({
      success: true,
      status: statusCode,
      code,
      message,
      data,
      error: null,
      meta
    });
  }

  static error(res, statusCode = 500, code = "INTERNAL_SERVER_ERROR", message = "Something went wrong", error = {}, meta = {}) {
    return res.status(statusCode).json({
      success: false,
      status: statusCode,
      code,
      message,
      data: null,
      error,
      meta
    });
  }
}

module.exports = ApiResponse;
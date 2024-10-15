function sendResponse(res, statusCode, data, message) {
    const statusMessages = {
      200: "success",
      201: "success",
      400: "bad request",
      401: "invalid credentials",
      404: "not found",
      409: "conflict",
      500: "internal server error",
    };
  
    const statusMessage = statusMessages[statusCode] || message;
  
    res.status(statusCode).json({
      code: statusCode,
      status: statusMessage,
      data: data,
      message: message || statusMessage,
    });
  }
  
  export default sendResponse;
  
import sendResponse from "../utils/sendResponse.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  sendResponse(res, statusCode, null, err.message);
};

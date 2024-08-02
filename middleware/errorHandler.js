export const notFound = async (req, res, next) => {
  const err = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(err);
};

export const errorHandler = async (req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: "fail",
    message: err?.message,
    stack: err?.stack,
  });
};

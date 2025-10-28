// middleware/loggerMiddleware.js
export function loggerMiddleware(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next(); // proceed to next middleware or route
}

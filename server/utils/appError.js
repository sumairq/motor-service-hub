export const errorMiddleware = (err, req, res, next) => {
  let message = err.message;
  let statusCode = err.statusCode || 500;
  //   // 🔴 Remember (For Mongo Errors)
  // When you console.log(err), Node.js tries to be helpful by showing you
  // all the extra custom properties the driver added (the enumerable ones),
  // but it follows the standard rules for the message property and keeps it
  // out of the curly-brace display.
  if (err.code === 11000) {
    const duplicatedField = Object.keys(err.keyValue)[0];
    message = `The ${duplicatedField} you entered is already registered.`;
    statusCode = 400;
  }
  console.log("ERORR STARTS HERE!!", err.name);
  //   console.dir(err, { showHidden: true, depth: null });
  res.status(statusCode || 500).json({
    status: "fail",
    message,
  });
};

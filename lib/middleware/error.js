// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  let message = err.message;
  if (status === 500 && process.env.NODE_ENV === 'production') {
    message = 'Unexpected server error';
  }
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  res.status(status);

  if (process.env.NODE_ENV !== 'test' || status === 500) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  res.send({ status, message });
};

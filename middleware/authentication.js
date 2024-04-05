const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (token && token.replace("Basic ", "") === process.env.BASIC_AUTH_TOKEN) {
    next();
  } else {
    return res.status(401).send({
      error: "Unauthorized request",
    });
  }
};

module.exports = auth;

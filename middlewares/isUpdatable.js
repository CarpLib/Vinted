const isUpdatable = (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "L'id est manquant" });
  }
  next();
};

module.exports = { isUpdatable };

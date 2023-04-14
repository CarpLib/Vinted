const isDeletable = (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "L'id est manquant" });
  }
  next();
};

module.exports = { isDeletable };

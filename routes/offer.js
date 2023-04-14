const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const convertToBase64 = require("../utils/base64");
const Offer = require("../models/Offer");
const isAuthenticated = require("../middlewares/isAuthenticate");
const { isUpdatable } = require("../middlewares/isUpdatable");
const { isDeletable } = require("../middlewares/isDeleted");
const User = require("../models/User");

router.post(
  "/offer/publish",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      console.log(req.user);
      //   console.log(req.body);
      const { title, description, price, brand, size, condition, color, city } =
        req.body;

      if (description.length >= 500) {
        res.status(400).json({ message: "Description trop longue" });
      }
      if (title.length >= 50) {
        res.status(400).json({ message: "Titre trop long" });
      }
      if (price >= 100000) {
        res.status(400).json({ message: "Prix trop élevé" });
      }

      const newOffer = new Offer({
        product_name: title,
        product_description: description,
        product_price: price,
        product_details: [
          { brand },
          { size },
          { condition },
          { color },
          { city },
        ],
        owner: req.user,
      });
      const pictureUpload = await cloudinary.uploader.upload(
        convertToBase64(req.files.picture),
        {
          folder: `/Vinted/offers/${newOffer._id}`,
        }
      );
      newOffer.product_image = pictureUpload;
      console.log(newOffer);
      await newOffer.save();
      //   console.log(newOffer);

      res.status(201).json({ newOffer });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/offer/update",
  isAuthenticated,
  fileUpload(),
  isUpdatable,
  async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        brand,
        size,
        condition,
        color,
        city,
        id,
      } = req.body;
      // console.log(req.body);
      //   console.log(req.files);
      const offer = await Offer.findById(id);
      // console.log(offer);

      if (!offer) {
        return res
          .status(404)
          .json({ message: "Aucune Offre ne correspond à l'Id" });
      }

      offer.product_name = title ?? offer.product_name;
      offer.product_description = description ?? offer.product_description;
      offer.product_price = price ?? offer.product_price;
      offer.product_details[0].brand = brand ?? offer.product_details[0].brand;
      offer.product_details[1].size = size ?? offer.product_details[1].size;
      offer.product_details[2].condition =
        condition ?? offer.product_details[2].condition;
      offer.product_details[3].color = color ?? offer.product_details[3].color;
      offer.product_details[4].city = city ?? offer.product_details[4].city;

      if (req.files !== null) {
        console.log(offer.product_image.public_id);
        //Suppréssion de l'ancienne image
        await cloudinary.uploader.destroy(offer.product_image.public_id);
        const newPicture = await cloudinary.uploader.upload(
          convertToBase64(req.files.picture),
          {
            folder: `/Vinted/offers/${id}`,
          }
        );
        offer.product_image = newPicture;
      }

      await Offer.updateOne({ _id: offer._id }, offer);

      res.status(200).json({ message: "Mise à jour avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/offer/delete",
  isAuthenticated,
  fileUpload(),
  isDeletable,
  async (req, res) => {
    try {
      const id = req.query.id;
      const offer = await Offer.findById(id);
      //suprésion de l'image
      await cloudinary.uploader.destroy(offer.product_image.public_id);
      await Offer.findByIdAndDelete(id);

      res.status(200).json({ message: "Offer a été supprimée avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/offers", async (req, res) => {
  try {
    const { title, priceMin, priceMax, sort, page = 1, limit = 2 } = req.query;
    const argFind = {};
    const argSort = {};
    let nbrSkip = 0;

    if (title) {
      const regExp = new RegExp(title, "i");
      argFind.product_name = regExp;
    }
    if (priceMin && priceMax) {
      argFind.product_price = {
        $gte: Number(priceMin),
        $lte: Number(priceMax),
      };
    } else if (priceMin) {
      // console.log(priceMin);
      argFind.product_price = {
        $gte: Number(priceMin),
      };
    } else if (priceMax) {
      argFind.product_price = {
        $lte: Number(priceMax),
      };
    }
    if (sort === "price-desc") {
      argSort.product_price = -1;
    } else if (sort === "price-asc") {
      argSort.product_price = 1;
    }

    if (page > 1) {
      for (let i = 0; i < page; i++) {
        nbrSkip += limit;
      }
      // console.log(nbrSkip);
    }

    const offers = await Offer.find(argFind)
      .select("product_name product_price product_details")
      .sort(argSort)
      .limit(limit)
      .skip(nbrSkip);

    const count = await Offer.countDocuments(argFind);
    res.status(200).json({ count: count, offers: offers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/offer/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const offer = await Offer.findById(req.params.id).populate(
      "owner",
      "account"
    );

    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

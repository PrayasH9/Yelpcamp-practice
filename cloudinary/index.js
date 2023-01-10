const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Campground = require("../models/campground");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "YelpCamp",
    allowed_formats: ["jpeg", "png", "jpg", "webp", "avif"],
    public_id: (req, file) => {
      const campground = new Campground(req.body.campground);
      const imageUrlName =
        campground.title.replace(" ", "-") + `-${randomNum()}`;
      return imageUrlName;
    },
  },
});

const randomNum = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {
  cloudinary,
  storage,
};

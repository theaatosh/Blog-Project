//middleware to handle image through cloudinary
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "ddm42l4y9",
  api_key: "629963432395396",
  api_secret: "cJgnv_bmuSjNfmSmtd4VH_3jAys",
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "InternBlogs",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
export const upload = multer({ storage });

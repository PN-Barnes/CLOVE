const router = require("express").Router();
const cloudinary = require("../../config/cloudinary");

router.post("/", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setup",
    });
    console.log("success", JSON.stringify(uploadedResponse, null, 2));
    res.status(200).json("ayayayayay");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

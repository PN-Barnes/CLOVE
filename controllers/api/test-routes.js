const router = require('express').Router();
const cloudinary = require('../../config/cloudinary');

router.post("/", async (req, res) => {
  try {
    const url = "https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80";
    // const url = "./public/assets/profile.jpeg"
    const uploadedResponse = await cloudinary.uploader
                                      .upload(url, {
                                        "resource_type": "image",
                                        upload_preset: 'dev_setup'
                                      });
    
    console.log("upload successfully");
    console.log(uploadedResponse);
    // res.status(200).json({message: "ayayayayay"});
    res.status(200).json(uploadedResponse);
    
    // const fileStr = req.body.data;
    // const uploadedResponse = await cloudinary.uploader
    //                                   .upload(fileStr, {
    //                                     upload_preset: 'dev_setup'
    //                                   });
    // console.log("success", JSON.stringify(response, null, 2));
    // res.status(200).json("ayayayayay");
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;

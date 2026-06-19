import { Router } from "express";
import multer from "multer";
import cloudinary from "../cloudinary.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// multer receives the file in memory; the SDK streams it to Cloudinary.
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/upload — upload an image, return the CDN URL to store on a record.
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  try {
    const result = await new Promise((ok, no) =>
      cloudinary.uploader
        .upload_stream({ folder: "tenanttrails" }, (e, r) =>
          e ? no(e) : ok(r)
        )
        .end(req.file.buffer)
    );
    res.json({ url: result.secure_url }); // secure_url is the CDN link
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;

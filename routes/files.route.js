const express = require("express")
const { upload, getListFiles, download, remove } = require("../controller/file.js")

const router = express.Router()

router.post("/upload", upload);
router.get("/files", getListFiles);
router.get("/files/:name", download);
router.delete("/files/:name", remove);


module.exports = router 
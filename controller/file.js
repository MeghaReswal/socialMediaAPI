const uploadFile = require("../middleware/upload.js");
const fs = require("fs");
const baseUrl = "http://localhost:2000/files/";
const path = require('path');
const __basedir = path.resolve();

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({
                success: false,
                message: "Please upload a file!"
            });
        }

        res.status(200).send({
            success: true,
            message: "Uploaded file successfully: " + req.file.originalname,
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                success: false,
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            success: false,
            message: `Could not upload the file: . ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send({
            success: true,
            data: fileInfos
        });
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Could not download the file. " + err,
            });
        }
    });
};

const remove = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Could not delete the file. " + err,
            });
        }

        res.status(200).send({
            success: true,
            message: "File is deleted.",
        });
    });
};

const removeSync = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    try {
        fs.unlinkSync(directoryPath + fileName);

        res.status(200).send({
            success: true,
            message: "File is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Could not delete the file. " + err,
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
    remove,
    removeSync,
};

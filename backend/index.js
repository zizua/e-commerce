const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// Connect Database With MongoDB --1start
mongoose.connect("mongodb+srv://zizua:66666666@cluster0.s5fkg.mongodb.net/e-commerce")
// --1end

// API Creation --2start
// 2b
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Image Storage Engine --3start
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb (null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = ({storage:storage})
// --3end

// Creating Upload Endpoint for Images --4start
// 4b
app.use('/images', express.static('upload/images'))

// 4a
app.post("/upload", upload.single('product'), (req, res)=> {
    res.json ({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})
// --4end

// 2a
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " +port)
    }
    else {
        console.log("Error: " +error)
    }
})
// --2end
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json()); // Middleware untuk mem-parsing body JSON
app.use(cors()); // Middleware untuk mengaktifkan CORS

// Connect Database With MongoDB --1start
mongoose.connect("mongodb+srv://zizua:66666666@cluster0.s5fkg.mongodb.net/e-commerce")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
    });
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
        return cb (null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) // Menentukan nama file yang diunggah
    }
})

const upload = multer({storage:storage})
// --3end

// Creating Upload Endpoint for Images --4start
// 4b
app.use('/images', express.static('upload/images')); // Menyajikan file statis dari direktori 'upload/images'

// 4a
app.post("/upload", upload.single('product'), (req, res)=> {
    res.json ({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}` // Mengirim URL gambar yang diunggah sebagai respons
    })
})
// --4end

// Schema for Creating Products --5start
// 5a
const Product = mongoose.model("Product", {
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,  
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
});

app.post('/addproduct', async (req,res) => {
    // 5c
    // Mengambil semua produk dari database
    let products = await Product.find({});
    let id;
    // Jika ada produk yang sudah ada, ambil produk terakhir dan tentukan id baru
    if (products.length>0){
        let last_product_array = products.slice(-1); // Mengambil produk terakhir dari array
        let last_product = last_product_array[0]; // Mengambil elemen pertama dari array yang berisi produk terakhir
        id = last_product.id+1; // Menentukan ID baru berdasarkan produk terakhir
    } 
    else{
        id:1; // Jika tidak ada produk, mulai dari ID 1
    }

    // 5b
    // Membuat objek produk baru dengan data dari permintaan
    const product = new Product({
        // id:req.body.id,
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    // Menyimpan produk baru ke database
    console.log(product);
    await product.save();
    console.log("Saved")
    // Mengirim respons sukses
    res.json({
        success:true,
        name:req.body.name,
    })
});
// --5end

// Creating API for Deleting Product --6start
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
    
})
// --6end


// 2a
// Menjalankan Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " +port)
    }
    else {
        console.log("Error: " +error)
    }
})
// --2end
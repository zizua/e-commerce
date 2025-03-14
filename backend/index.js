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

// Schema for Creating Products (Create & Add Product) --5start
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
        id = last_product.id + 1; // Menentukan ID baru berdasarkan produk terakhir
    } 
    else{
        id = 1; // Jika tidak ada produk, mulai dari ID 1
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
    });
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

// Creating API for Getting All Products --7start
app.get('/allproducts', async (req,res)=> {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
    
})
// --7end

// Schema Creating for User Model --8start
// 8a 
const Users = mongoose.model('Users', {
    name:{
        type:String,
    }, 
    email:{
        type:String,
        unique:true,
    }, 
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// 8b
// Creating Endpoint for User Registration
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({email:req.body.email}) // Mencari apakah email sudah terdaftar
    if (check) {
        return res.status(400).json({success:false, errors:"existing user found with email address"}) // Mengirim respons jika email sudah terdaftar
    } 
    let cart = {}; // Membuat objek keranjang kosong
        for (let i = 0; i < 300; i++) { // Menginisialisasi keranjang dengan 300 produk, masing-masing dengan jumlah 0.
            cart[i] = 0; // Menambahkan produk ke keranjang dengan jumlah 0
        }
        const user = new Users({ // Membuat objek pengguna baru
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
        })
        await user.save(); // Menyimpan data pengguna baru ke database
        console.log("User Registered");

        const data = { // Membuat objek data untuk token JWT
            user: {
                id:user.id,
            }
        }

        const token = jwt.sign(data, 'secret_ecom'); // Membuat token JWT
        res.json({success:true, token}); // Mengirim token JWT sebagai
})
// --8end

// Creating endpoint for User Login --9start
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email:req.body.email}); // Mencari pengguna berdasarkan email
    if (user) {
        const passCompare = req.body.password === user.password; // Membandingkan kata sandi yang diberikan dengan kata sandi pengguna
        if (passCompare) {
            const data = { // Membuat objek data untuk token JWT
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom'); // Membuat token JWT
            res.json({success:true, token});
        } 
        else {
            res.json({success:false, errors:"Wrong Password"}); 
        }
    }
    else {
        res.json({success:false, errors:"Wrong Email Id"}); 
    }
})
// --9end

// creating endpoint for newcollections data --10start
app.get('/newcollections', async (req, res) => { 
    let products = await Product.find({}); // Mengambil semua produk dari database
    let newcollection = products.slice(1).slice(-8); // Mengambil 8 produk terakhir dari array produk
    console.log("New Collection Fetched"); 
    res.send(newcollection); // Mengirim produk terakhir sebagai respons
})
// --10end

// creating endpoint for popular in women data --11start
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category:"women"}); // Mengambil semua produk dari database dengan kategori wanita
    let popular_in_women = products.slice(0, 4); // Mengambil 4 produk pertama dari array produk
    console.log("Popular in Women Fetched");
    res.send(popular_in_women); // Mengirim 4 produk pertama sebagai respons

})
// --11end

// creating middleware to fetch user data --13start
    const fetchUser = async (req, res, next) => {
        const token = req.header('auth-token'); // Mengambil token dari header
        if (!token) {
            res.status(401).send({errors: "Please authenticate using valid token!"}); // Mengirim respons jika token tidak ada}
        }
        else {
            try {
                const data = jwt.verify(token, 'secret_ecom'); // Memverifikasi token
                req.user = data.user; // Menyimpan data pengguna dalam objek permintaan
                next(); // Melanjutkan eksekusi
            } catch (error) {
                res.status(401).send({errors: "Please authenticate using valid token!"}); // Mengirim respons jika token tidak valid
            }
        }
    } 

// creating endpoint for adding product to cartdata and database --12start
// 12a
// app.post('/addtocart', async (req, res) => {
//     console.log(req.body);
// })

// 12b
app.post('/addtocart', fetchUser, async (req, res) => {
    // console.log(req.body,req.user);
    console.log("Added product id number:", req.body.itemId);  
    let userData = await Users.findOne({_id:req.user.id}); // Mengambil data pengguna berdasarkan ID pengguna
    userData.cartData[req.body.itemId] += 1; // Menambahkan jumlah produk ke keranjang pengguna
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData}); // Menyimpan data pengguna yang diperbarui ke database
    res.send("Added"); // Mengirim respons
})
// --12end

// creating endpoint for removing product from cartdata and database --14start
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed product id number:", req.body.itemId);    
    let userData = await Users.findOne({_id:req.user.id}); // Mengambil data pengguna berdasarkan ID pengguna
    if(userData.cartData[req.body.itemId] > 0); // Memastikan bahwa jumlah produk yang akan dihapus lebih besar
    userData.cartData[req.body.itemId] -= 1; // Mengurangi jumlah produk dari keranjang pengguna
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData}); // Menyimpan data pengguna yang diperbarui ke database
    res.send("Removed"); // Mengirim respons
})
// --14end

// creating endpoint for getting cartdata --15start
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id}); // Mengambil data pengguna berdasarkan ID pengguna
    res.json(userData.cartData); // Mengirim keranjang pengguna sebagai respons
})

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
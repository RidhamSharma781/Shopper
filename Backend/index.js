const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Connection with MongoDb Database
mongoose.connect("mongodb+srv://ridham781:ridham%402003@cluster0.auldyz0.mongodb.net/e-commerce")

// API Creation

app.get("/", (req, res) => {
    res.send("Express App is Running");
})


// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Creating Schema for Products

const Product = mongoose.model("Product",{
    id:{
        type : Number,
        required:true
    },
    name:{
        type : String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    available:{
        type:Boolean,
        default:true
    }
})

// Creating API for adding products to Db

app.post('/addproduct',async (req,res)=>{
    let allProducts = await Product.find({});     // allProducts is an array which contains all the products present in out database
    let id ;
    if(allProducts.length>0){
        let lastProduct_array = allProducts.slice(-1);
        let lastProduct = lastProduct_array[0];
        id = lastProduct.id+1;
    }else{
        id = 1;
    }
    const product = new Product({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success : true,
        name : req.body.name
    });
})

// Creating API for removing products from Db

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success : true,
        name : req.body.name
    })
});

// Creating API for getting All Products from Db

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Creating Schema for User Model

const Users = mongoose.model('Users',{
    username:{
        type : String
    },
    email :{
        type : String,
        unique : true
    },
    password :{
        type : String
    },
    cartData :{
        type : Object
    },
    date:{
        type : Date,
        default: Date.now()
    }
});

// Creating API for registering new user
app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        res.status(400).json({success:false,errors:'Existing user found with same email account'})
    }
    let cart = {};
    for (let i=0; i<300;i++) {
        cart[i] = 0;
    }
    const user = new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

// Creating API for User Login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCheck = req.body.password === user.password;
        if(passCheck){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }else{
            res.json({success:false,errors:"Wrong Password"})
        }   
    }else{
        res.json({success:false,errors:"Wrong Email Id"})
    }  
});

// Creating API for New Collections
app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({});
    let newCollections = products.slice(1).slice(-8);
    console.log("New Collections Fetched");
    res.send(newCollections);
})

// Creating API for Popular category
app.get('/popular',async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular = products.slice(1).slice(0,4);
    console.log("Popular in Women Fetched")
    res.send(popular);
})



// Creating Middleware for fetching User
  const fetchUser = async (req,res,next)=>{
      const token = req.header('auth-token');
      if(!token){
          res.status(401).send({errors:"Pleace Authenticate using a valid token"})
      }
      else{
          try {
              const data = jwt.verify(token,'secret_ecom');
              req.user = data.user;
              next();
          } catch (error) {
             res.status(401).send({errors:"Please Authenticate using a valid token"})
          }
      }
  }

 
// Creating API for saving cartData to Mongo Db
 app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.item);
     let userData = await Users.findOne({_id:req.user.id});
     userData.cartData[req.body.item] += 1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
     res.send("Added");
 }) 

// Creating API for removing cartData from Mongo Db
 app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("Removed",req.body.item);
     let userData = await Users.findOne({_id:req.user.id});
     if(userData.cartData[req.body.item] > 0)
     userData.cartData[req.body.item] -= 1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
     res.send("Removed");
 }) 

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port : ${port}`);
    } else {
        console.log("Error :" + error);
    }
})
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
const MONGODB_URL =
  "mongodb+srv://haneen:haneen%401921@faithstore.41jrqin.mongodb.net/haneenEcommerce?retryWrites=true&w=majority&appName=faithStore";
//mongodb connection
// mongoose.set('strictQuery', false)
// mongoose.connect(process.env.MONGODB_URL)

async function connect() {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
  }
}

connect();

// schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
  image: String,
});

// model
const userModel = mongoose.model("user", userSchema);

//api
app.get("", (req, res) => {
  res.send("Server is running");
});

// sign up
app.post("/signup", (req, res) => {
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        res.send({ message: "Email id is already registered", alert: false });
      } else {
        const data = new userModel(req.body);
        return data.save();
      }
    })
    .then(() => {
      res.send({ message: "Successfully signed up", alert: true });
    })
    .catch((err) => {
      res.send({ message: "Error occurred", alert: false });
    });
});

// api login
// app.post("/login", (req, res) => {
//   const { email } = req.body;
//   userModel.findOne({ email: email }, (err, result) => {
//     if (result) {
//       res.send({ message: "Login is successfully", alert: true });
//     }
//   });
// });

// api login

app.post("/login", (req, res) => {
  const { email } = req.body;

  userModel.findOne({ email: email }).then((result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", schemaProduct);

//save product in database
//api
app.post("/uploadProduct", async (req, res) => {
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(data);
});

// payment gateway

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/checkout.payment", async (req, res) => {

  try {
    const params = {
      submit_type : 'pay',
      mode : 'payment',
      payment_method_types : ['card'],
      billing_address_collection : "auto",
      shipping_options : [{shipping_rate : "shr_1PbIHyFYCHz1Xzv9mhsqVEIn"}],

      line_items : req.body.map((item)=>{
        return{
          price_data : {
            currency : "usd",
            product_data : {
              name : item.name,
              // images : [item.image]
            },
            unit_amount : item.price * 100,
          },
          adjustable_quantity : {
            enabled : true,
            minimum : 1,
          },
          quantity : item.qty
        }
      }),

      success_url : `${process.env.FRONTEND_URL}/success`,
      cancel_url : `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

//server is running
app.listen(PORT, () => console.log("server is running at port : " + PORT));

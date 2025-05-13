require('dotenv').config();
const cors = require('cors')
const express = require("express")
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000

// CORS Options
const corsOptions = {
  origin: "http://localhost:3000", 
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to Database
const database = require("./Config/DataBaseConnect");
database.DBConnect();

// User Section for Routes
const authRoute = require("./Routes/AuthRoute")
const profileDetails = require("./Routes/profileDetailsRoute")
const allUsersDetails = require("./Routes/getAllUserDataRoute")
const getAllproducts = require("./Routes/getAllProductsRoute")
const cartItems = require("./Routes/CartItemRoute")
const sendMail = require("./Routes/MailerRoute")
const getCartData = require("./Routes/getAllCartDataRoute")
const placeOrder = require("./Routes/PlaceOrderRoute")
const getOrderData = require("./Routes/getAllOrdersDataRoute")
const updateTracking = require("./Routes/OrderTrackingRouteRoute")

app.use("/api/v1/updateTracking", updateTracking)
app.use("/api/v1/getAllorderData", getOrderData)
app.use("/api/v1/placeOrder", placeOrder)
app.use("/api/v1/getCartData", getCartData)
app.use("/api/v1/mailSend", sendMail)
app.use("/api/v1/cartItemsAdd", cartItems)
app.use("/api/v1/getAllProductsDetails", getAllproducts)
app.use("/api/v1/getAllusersData", allUsersDetails)
app.use("/api/v1/signup", authRoute)
app.use("/api/v1/login", authRoute)
app.use("/api/v1/profileDetails",profileDetails)


// Admin Section for Routes 
const addProducts = require("./Routes/Admin_Routes/addProductsRoute")

app.use("/api/v1/adminLogin", authRoute)
app.use("/api/v1/addproducts", addProducts)


app.get('/', (req, res) => {
   res.send('Hello from the backend!');
});

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`);
});
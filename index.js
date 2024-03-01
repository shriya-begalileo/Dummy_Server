const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRoutes");
const { productRouter } = require("./routes/productsRoutes");
const admin = require("firebase-admin");
const serviceAccount = require("./utils/myauthentication-415307-firebase-adminsdk-s5a1a-f48cd332e3.json");

const cors = require("cors");
const { fcmTokenRouter } = require("./routes/fcmRoutes");
const FcmTokenModel = require("./models/fcmToken.model");
const FcmModel = require("./models/fcm.model");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to Dummy Server !!");
});
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/fcmNaveen", fcmTokenRouter);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.post("/send-notification", async (req, res) => {
  // const registrationToken = req.body.token; // Assuming you are sending the token in the request body
  const fcmTokens = await FcmTokenModel.find();
  const uniqueFcmToken = await FcmModel.find({ email: "" });
 console.log(uniqueFcmToken)
  console.log(uniqueFcmToken[uniqueFcmToken.length - 1].fcmtoken, "alok");

  console.log(fcmTokens[fcmTokens.length - 1]);
  const registrationToken = uniqueFcmToken[uniqueFcmToken.length - 1].fcmtoken;
  console.log("res", registrationToken);
  console.log("test", req.body);
  const message = {
    notification: {
      title: "Notification Title",
      body: "Notification Body",
    },
    token: registrationToken,
    data: { screen: "Dashboard" },
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res
        .status(200)
        .json({ success: true, message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to send notification" });
    });
});


const PORT = 8080;
app.listen(PORT, async () => {
  try {
    await connection();
    console.log("Connected to DB");
    console.log(`App is listening to ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

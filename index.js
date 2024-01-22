const express = require("express");
const dotenv = require("dotenv");
const Cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./mySQL-DB");

const otpAuth = require("./routes/otp-auth");
const userRoutes = require("./routes/users-route");
const tokenRoutes = require("./routes/verify-token");
const linkedinRoutes = require("./routes/linkedin-routes");
const trackDataRoutes = require("./routes/track-data-route");

//App config
const app = express();
const port = process.env.PORT || 8003;

//middleware
dotenv.config();
app.use(Cors());

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL database:", err.message);
  });

app.use("/api/otp", otpAuth);
app.use("/api/user", userRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/linkedin", linkedinRoutes);

app.use("/api/track-data", trackDataRoutes);

app.listen(port, () => console.log(`server is up on ${port}`));

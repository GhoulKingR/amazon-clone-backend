const express = require("express");
const stripe = require("stripe")(
  "sk_test_51MgAdyIX5vypJLVMGq1lEPn23mJlqYF6SZPCl55bLzFNbjcPxUpcErtw4GvR7eXx80fuzC0kZFYpq3Cu6JhWwLyO003icYYFpy"
);
const cors = require("cors");

// App config
const app = express();

// middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello, world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment Request received (amount):", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
module.exports = app;

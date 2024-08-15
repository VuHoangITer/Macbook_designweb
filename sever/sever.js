node severjs;
const express = require("express");
const app = express();
const stripe = require("stripe")("YOUR_SECRET_KEY");

app.use(express.static("public"));
app.use(express.json());

app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000, // Số tiền tính bằng cents
      currency: "usd",
      description: "Ví dụ thanh toán",
      source: req.body.stripeToken,
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(3000, () => console.log("Server đang chạy trên cổng 3000"));

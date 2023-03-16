const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');

// подключение маршрутов
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");


app.use(express.json());
app.use(cors());

// регистрация маршрутов
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

// обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));
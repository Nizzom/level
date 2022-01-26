const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Good = require("./models/Good");
const Order = require("./models/Order");
const User = require("./models/User");
const Coefficient = require("./models/Coefficient")

router.get("/create-cargo", async (req, res)=>{
  try {
    const one = new Coefficient({
      cargo: 50000
    })
    await one.save()
    res.status(200).json(one);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
})
router.post("/cargo", async (req, res)=>{
  try {
    const one = await Coefficient.findOne({})
    res.status(200).json(one);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
})
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте снова" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT__SEC, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/get-one", async (req, res) => {
  try {
    const { id } = req.body;
    const one = await Good.findById(id);
    if (!one) {
      return res.status(400).json({ message: "такого товара не существует" });
    }
    res.status(200).json(one);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/order/add", async (req, res) => {
  const {
    name,
    lastName,
    goods,
    phone,
    email,
    address,
    homeNumber,
    total,
    totalPrice,
    totalWeight,
    status,
    comment,
  } = req.body;
  try {
    const count = await Order.count();
    const order = new Order({
      name,
      lastName,
      goods,
      phone,
      email,
      address,
      homeNumber,
      total,
      totalPrice,
      totalWeight,
      status,
      comment,
      number: count + 1,
    });
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/get", async (req, res) => {
  const { filter, sort, skip, _pol, _brand, limit, type } = req.body;
  let f_val = filter ? filter : {};
  let brand = _brand ? _brand : "";
  let items = {};
  let _limit = limit ? limit : 30;
  let pol = _pol === "men" ? true : false;
  const sortArray = [{ date: 1 }, { date: -1 }, { price: 1 }, { price: -1 }];
  if (type) { 
    try {
      const good = await Good.find({ $text: { $search: filter } })
        .skip(skip)
        .limit(_limit)
        .sort(sortArray[+sort]);
      return res.status(200).json(good);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (f_val === filter) {
    if (filter === "clothes") {
      items = { type: "clothes" };
      items["pol"] = pol;
      brand ? (items["brand"] = brand) : false;
    } else if (filter === "shoes") {
      items = { type: "shoes" };
      items["pol"] = pol;
      brand ? (items["brand"] = brand) : false;
    } else if (filter === "bags") {
      items = { type: "bags" };
      items["pol"] = pol;
      brand ? (items["brand"] = brand) : false;
    } else if (filter === "all" || filter === "new") {
      items["pol"] = pol;
      brand ? (items["brand"] = brand) : false;
    } else {
      items["categorie"] = filter;
      items["pol"] = pol;
      brand ? (items["brand"] = brand) : false;
    }
  }
  try {
    const good = await Good.find(items)
      .skip(skip)
      .limit(_limit)
      .sort(sortArray[+sort]);
    res.status(200).json(good);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

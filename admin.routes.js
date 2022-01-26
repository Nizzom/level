const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const Good = require("./models/Good");
const Order = require("./models/Order");
const auth = require("./middleware/auth.middleware");
const Coefficient = require("./models/Coefficient")

router.post("/cargo", async (req, res)=>{
  try {
    const one = await Coefficient.findOne({})
    one.set({
      cargo: req.body.cargo
    })
    await one.save()
    res.status(200).json(one);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
})

router.post("/get-order", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.find({ status: status });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/update-order", auth, async (req, res) => {
  try {
    const { status, id } = req.body;
    await Order.findByIdAndUpdate(id, { status: status });

    res.status(201).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/delete-order", auth, async (req, res) => {
  try {
    const { id } = req.body;
    await Order.findByIdAndDelete(id);

    res.status(201).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/goods-count", auth, async (req, res) => {
  try {
    const count = await Good.count();

    res.status(201).json(count);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    const { aviable, id } = req.body;
    await Good.findByIdAndUpdate(id, { aviable: aviable });
    res.status(201).json("Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/orders-count", auth, async (req, res) => {
  try {
    const count = await Order.count();

    res.status(201).json(count);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const good = new Good(req.body);
    const savedGood = await good.save();
    res.status(200).json(savedGood);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Good.findByIdAndDelete(id);
    await fs.rmdir(
      path.join(__dirname, `/public/${id}`),
      { recursive: true },
      (err) => {
        if (err) {
          throw err;
        }

        console.log(`${id} is deleted!`);
      }
    );
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/add-file/:id", auth, async (req, res) => {
  try {
    const img1 = req.files.img1;
    const img2 = req.files.img2;
    const img3 = req.files.img3;
    const img4 = req.files.img4;
    const { id } = req.params;

    await fs.mkdir(path.join(__dirname, `/public/${id}`), (err) =>
      console.log(err)
    );
    img1.mv(path.join(__dirname, `public/${id}/01.png`));
    img2.mv(path.join(__dirname, `public/${id}/02.png`));
    img3.mv(path.join(__dirname, `public/${id}/03.png`));
    img4.mv(path.join(__dirname, `public/${id}/04.png`));

    res.status(200).json("Added");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

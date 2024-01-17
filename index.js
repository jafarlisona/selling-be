import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
const key = process.env.KEY;
app.use(express.json())
app.use(cors())

const productsSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
});

const productsModel = mongoose.model("products", productsSchema);

app.get("/products", async (req, res) => {
  try {
    const allProducts = await productsModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    res.send("Products are not found!");
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.findById(id);
  res.send(product);
});

app.post("/products", async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const newProducts = new productsModel({ title, image, description });
    await newProducts.save();
    res.send("Products are created!");
  } catch (error) {
    res.send("Products are not created!");
  }
});

app.put("/products/:id", async (req, res) => {
  const { title, image, description } = req.body;
  const { id } = req.params;
  const product = await productsModel.findByIdAndUpdate(id, {
    title,
    image,
    description,
  });
  res.send(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.findByIdAndDelete(id);
  res.send(product);
});

mongoose
  .connect(key)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Not Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

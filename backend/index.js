const express = require("express");
const connection = require("./Connection");
const model = require("./Schema");
const cors = require("cors");
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/get", async (req, res) => {
  try{
    let data = await model.find();
    res.send(data);
  }
  catch(err){
    res.send(err);
  }
});

app.post("/add", async (req, res) => {
  try {
    let data = await connection;
    const { to_do } = req.body;
    let result = await model.create({
      to_do: to_do,
    });
    if (result) {
      res.send("Data added successfully!");
    } else {
      res.send("Failed to add data.");
    }
  } catch (err) {
    res.send(err.message);
  }
});

app.delete("/delete", async (req, res) => {
  let data = await connection;
  const { id } = req.body;
  let result = await model.deleteOne({ _id: id });
  if (result.acknowledged) {
    if (result.deletedCount == 0) {
      res.send("There is no data to delete");
    } else {
      res.send("Data is deleted successfully");
    }
  } else {
    res.send("Data is not deleted");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

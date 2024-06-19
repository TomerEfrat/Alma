import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;


const db = new pg.Client({
  user: "alma_db_user",
  host: "dpg-cp255ien7f5s73fb0l10-a.frankfurt-postgres.render.com",
  database: "alma_db",
  password: "YcKw6ps7C8J2NDUSPczmoGTgzedXzdJt",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let sku_tracking1 = [];
let sku_tracking2 = [];
let sku_tracking3 = [];

// Home page route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Department 1 routes
app.get("/department1", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM sku_tracking1 ORDER BY id1 ASC");
    sku_tracking1 = result.rows;
    res.render("department1.ejs", { listsku1: sku_tracking1 });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add1", async (req, res) => {
  const sku_code1 = req.body.newSku;
  const date_added1 = new Date();
  try {
    await db.query("INSERT INTO sku_tracking1 (sku_code1, date_added1) VALUES ($1, $2)", [sku_code1, date_added1]);
    res.redirect("/department1");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete1", async (req, res) => {
  const id1 = req.body.deleteskuId;
  try {
    await db.query("DELETE FROM sku_tracking1 WHERE id1 = $1", [id1]);
    res.redirect("/department1");
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateDateOrder1", async (req, res) => {
  const ordered1 = req.body.dateOrderChecked;
  const id1 = req.body.updatedskuId;
  const order_date1 = new Date();
  try {
    await db.query("UPDATE sku_tracking1 SET ordered1 = $1, order_date1 = $2 WHERE id1 = $3", [ordered1, order_date1, id1]);
    res.redirect("/department1");
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteDateOrder1", async (req, res) => {
  const id1 = req.body.updatedskuId;
  try {
    await db.query("UPDATE sku_tracking1 SET ordered1 = false, order_date1 = NULL WHERE id1 = $1", [id1]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting order date.");
  }
});

app.post("/updateDateArrival1", async (req, res) => {
  const arrived1 = req.body.dateArrivalChecked;
  const id1 = req.body.updatedskuId2;
  const arrival_date1 = new Date();
  try {
    await db.query("UPDATE sku_tracking1 SET arrived1 = $1, arrival_date1 = $2 WHERE id1 = $3", [arrived1, arrival_date1, id1]);
    res.redirect("/department1");
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteDate1", async (req, res) => {
  const id1 = req.body.updatedskuId2;
  try {
    await db.query("UPDATE sku_tracking1 SET arrived1 = false, arrival_date1 = NULL WHERE id1 = $1", [id1]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting date.");
  }
});

// Department 2 routes
app.get("/department2", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM sku_tracking2 ORDER BY id2 ASC");
    sku_tracking2 = result.rows;
    res.render("department2.ejs", { listsku2: sku_tracking2 });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add2", async (req, res) => {
  const sku_code2 = req.body.newSku;
  const date_added2 = new Date();
  try {
    await db.query("INSERT INTO sku_tracking2 (sku_code2, date_added2) VALUES ($1, $2)", [sku_code2, date_added2]);
    res.redirect("/department2");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete2", async (req, res) => {
  const id2 = req.body.deleteskuId;
  try {
    await db.query("DELETE FROM sku_tracking2 WHERE id2 = $1", [id2]);
    res.redirect("/department2");
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateDateOrder2", async (req, res) => {
  const ordered2 = req.body.dateOrderChecked;
  const id2 = req.body.updatedskuId;
  const order_date2 = new Date();
  try {
    await db.query("UPDATE sku_tracking2 SET ordered2 = $1, order_date2 = $2 WHERE id2 = $3", [ordered2, order_date2, id2]);
    res.redirect("/department2");
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteDateOrder2", async (req, res) => {
  const id2 = req.body.updatedskuId;
  try {
    await db.query("UPDATE sku_tracking2 SET ordered2 = false, order_date2 = NULL WHERE id2 = $1", [id2]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting order date.");
  }
});

app.post("/updateDateArrival2", async (req, res) => {
  const arrived2 = req.body.dateArrivalChecked;
  const id2 = req.body.updatedskuId2;
  const arrival_date2 = new Date();
  try {
    await db.query("UPDATE sku_tracking2 SET arrived2 = $1, arrival_date2 = $2 WHERE id2 = $3", [arrived2, arrival_date2, id2]);
    res.redirect("/department2");
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteDate2", async (req, res) => {
  const id2 = req.body.updatedskuId2;
  try {
    await db.query("UPDATE sku_tracking2 SET arrived2 = false, arrival_date2 = NULL WHERE id2 = $1", [id2]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting date.");
  }
});

// Department 3 routes
app.get("/department3", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM sku_tracking3 ORDER BY id3 ASC");
    sku_tracking3 = result.rows;
    res.render("department3.ejs", { listsku3: sku_tracking3 });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add3", async (req, res) => {
  const sku_code3 = req.body.newSku;
  const date_added3 = new Date();
  try {
    await db.query("INSERT INTO sku_tracking3 (sku_code3, date_added3) VALUES ($1, $2)", [sku_code3, date_added3]);
    res.redirect("/department3");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete3", async (req, res) => {
  const id3 = req.body.deleteskuId;
  try {
    await db.query("DELETE FROM sku_tracking3 WHERE id3 = $1", [id3]);
    res.redirect("/department3");
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateDateOrder3", async (req, res) => {
  const ordered3 = req.body.dateOrderChecked;
  const id3 = req.body.updatedskuId;
  const order_date3 = new Date();
  try {
    await db.query("UPDATE sku_tracking3 SET ordered3 = $1, order_date3 = $2 WHERE id3 = $3", [ordered3, order_date3, id3]);
    res.redirect("/department3");
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteDateOrder3", async (req, res) => {
  const id3 = req.body.updatedskuId;
  try {
    await db.query("UPDATE sku_tracking3 SET ordered3 = false, order_date3 = NULL WHERE id3 = $1", [id3]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting order date.");
  }
});

app.post("/updateDateArrival3", async (req, res) => {
  const arrived3 = req.body.dateArrivalChecked;
  const id3 = req.body.updatedskuId2;
  const arrival_date3 = new Date();
  try {
    await db.query("UPDATE sku_tracking3 SET arrived3 = $1, arrival_date3 = $2 WHERE id3 = $3", [arrived3, arrival_date3, id3]);
    res.redirect("/department3");
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteDate3", async (req, res) => {
  const id3 = req.body.updatedskuId2;
  try {
    await db.query("UPDATE sku_tracking3 SET arrived3 = false, arrival_date3 = NULL WHERE id3 = $1", [id3]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting date.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
   user: "alma_db_user",
   host: "dpg-cp255ien7f5s73fb0l10-a.frankfurt-postgres.render.com",
   database: "alma_db",
   password: "YcKw6ps7C8J2NDUSPczmoGTgzedXzdJt",
   port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let sku_tracking = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM sku_tracking ORDER BY id ASC");
    sku_tracking = result.rows;

    res.render("index.ejs", {
      listsku: sku_tracking,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const sku_code = req.body.newSku;
  const date_added = new Date();
  try {
    await db.query("INSERT INTO sku_tracking (sku_code, date_added) VALUES ($1, $2)", [sku_code,date_added]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteskuId;
  try {
    await db.query("DELETE FROM sku_tracking WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateDateOrder", async (req, res) => {
   const ordered = req.body.dateOrderChecked;
   const  id = req.body.updatedskuId;
   const order_date = new Date();
   try {
     await db.query("UPDATE sku_tracking SET ordered = $1, order_date = $2 WHERE id = $3", [ordered,order_date, id,]);
     res.redirect("/");
   } catch (err) {
     console.log(err);
   }
});

app.post("/updateDateArrival", async (req, res) => {
  const arrived  = req.body.dateArrivalChecked;
  const  id = req.body.updatedskuId2;
  const arrival_date = new Date();
  try {
    await db.query("UPDATE sku_tracking SET arrived = $1, arrival_date = $2 WHERE id = $3", [arrived,arrival_date, id,]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});

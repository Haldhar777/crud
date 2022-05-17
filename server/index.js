const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "7247517280",
  database: "employeesystem",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Added to db");
      }
    }
  );
  res.send("data received");
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;

  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("employee updated");
      }
    }
  );
  res.send("updated");
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted successfully");
    }
  });

  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server running at port 3001");
});

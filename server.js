const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 4000;

const usersRoute = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute");
const issuesRoute = require("./routes/issuesRoute");
const reportsRoute = require("./routes/reportsRoute");
const externalBooksRoute = require("./routes/externalBooksRoute");

app.use(cors());
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/reports", reportsRoute);
app.use("/api/external-books", externalBooksRoute);

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Node server started at ${port}`));

require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const taskRouter = require("./routers/taskRouter");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();
// middleware
app.use(express.static("./public"));
app.use(express.json());

// router
app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

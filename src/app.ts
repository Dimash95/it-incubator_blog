import express from "express";
import { apiRouter } from "./router";

const app = express();
const port = 6060;

app.use(express.json());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;

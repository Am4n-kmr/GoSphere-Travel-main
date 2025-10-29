import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello from test server</h1>");
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`✅ Test server running on http://localhost:${PORT}`)
);

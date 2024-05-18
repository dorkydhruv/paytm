const express = require("express");

const app = express();
app.use(express.json());
app.use("api/v1/", require("./routes/index.js"));
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
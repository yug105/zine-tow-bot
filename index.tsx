const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

app.use(express.static('public'));
app.use(express.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/towcount", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log("Error connecting to MongoDB:", e);
});

// Define counta and countb as separate fields
const schema = new mongoose.Schema({
    counta: { type: Number, default: 0 },
    countb: { type: Number, default: 0 }
});
const Count = mongoose.model("Count", schema);
app.get("/", (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})
app.get("/teama", (req, res) => {
    res.sendFile(path.resolve('public/teama.html'));
});

app.get("/teamb", (req, res) => {
    res.sendFile(path.resolve('public/teamb.html'));
});

app.post("/clickeda", async (req, res) => {
    console.log("Button A clicked");
    try {
        let count = await Count.findOne();
        if (!count) {
            count = new Count();
        }
        count.counta++;  // Update counta directly
        await count.save();
        res.json(count);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.post("/clickedb", async (req, res) => {
    console.log("Button B clicked");
    try {
        let count = await Count.findOne();
        if (!count) {
            count = new Count();
        }
        count.countb++;  
        await count.save();
        res.json(count);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.get("/count", async (req, res) => {
    try {
        const count = await Count.findOne();
        res.json(count);  // Return the count object
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.listen(3002, () => {
    console.log("Server started on port 3002");
});
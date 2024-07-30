
const express = require('express');
const mongoose = require('mongoose');
const financialRecordRouter = require("./routes/financial-records");
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Personal Finance Tracker API');
});
    
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})

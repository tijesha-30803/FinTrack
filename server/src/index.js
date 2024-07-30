//pwd: Tijesha123
//username: tijesharoy30
const express = require('express');
const mongoose = require('mongoose');
const financialRecordRouter = require("./routes/financial-records");
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
const mongoURI = "mongodb+srv://new_user_3008:Password123@personalfinancetracker.ss7nmub.mongodb.net/"
  //connects project to database
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
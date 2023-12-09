const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://shaurya:shaurya@cluster0.blairxh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use("/auth", userRoutes);
app.use("/post", postRoutes);
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

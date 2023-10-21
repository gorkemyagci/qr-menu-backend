const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3001;

mongoose.connect(process.env.MONGODB_CONNECT_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log(error);
});

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

app.use('/users', userRoute);
app.use('/categories', categoryRoute);
app.use('/products', productRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
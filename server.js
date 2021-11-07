const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
//const bodyParser = require("body-parser");

const items = require('./routes/api/items')


const app = express();

// BodyParser Middleware
// app.use(bodyParser.json());  after node 4.16+ bodyParser is deprecated

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose
.connect(db)
.then(() => console.log('Mongo DB Connected... '))
.catch(err=>console.log(err));

// use Routes
app.use('/api/items',items)


// Serve static assets if in production:
if (process.env.NODE_ENV === 'production') {
    //Set Static Folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}


const port = process.env.PORT || 5010;
app.listen(port, ()=> console.log(`Server started on port ${port}`))


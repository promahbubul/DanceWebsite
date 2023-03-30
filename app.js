const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const app = express();
const host = 'localhost';
const port = 8000;

// Define Mongooes Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug',);
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug',);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This Data has been Saved to the Database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the Database");
    })
    // res.status(200).render('contact.pug',);
})



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${host}:${port}`);
});
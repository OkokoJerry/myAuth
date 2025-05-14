const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const hbs = require('hbs');
const template = path.join(__dirname, './hbs');
const exphbs = require('express-handlebars');
const { User } = require('./mongoSchema');

app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', template);
app.use(express.urlencoded({extended: false}));


app.engine('handlebars', exphbs.engine());

app.use(express.static('public'));
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const check = await User.findOne({name:req.body.name});
        if(check.password === req.body.password){
            res.render('home');
        } else{
            res.send('Wrong password.');
        }
    } catch (error) {
        res.send('Wrong login details.');
    }
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }
    await User.insertMany([data]);
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.listen(port, () => {
    console.log(`Server booming on ${port}`);
});
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');




//middleware  which forwards to route
app.use((req, res, next) => {
let now = new Date().toString();
let log = `${now}: ${req.method} ${req.url}`;

console.log(log);
fs.appendFile('server.log', log + '\n', (err) => {
 if(err){
 	console.log('Unable to append to server log');
 }
});
 next();
})

// app.use((req, res, next) => {
// res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});
app.get('/',(req, res) => {
    //res.send('<h1>Hello Ankit!</h1>');
    res.render('home.hbs',{
    	headerMessage: 'sampleing and testing is a way to look ',
    	pageTitle: 'Home Page',
    	welcomeMessage: 'Hi! there welecome to our world',

    });
});
app.get('/about', (req,res) => {
   res.render('about.hbs',{
   	headerMessage: 'we do not know about ourself',
   	pageTitle: 'About Page',
   });
});
app.get('/nosql',(req,res) =>{
   res.send('hey done');
});

app.listen(8000);

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('captial',(text)=>{
  return text.toUpperCase();
});



// app.use((req,res,next)=>{
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now} ${req.url} ${req.method}`;
  console.log(log);
  fs.appendFile('server.log' , log + '\n' ,(error)=>{
    if(error){
      console.log('Unable to append to the server log');
    }
  });
  next();
})

app.get('/' , (req,res)=>{
  // res.send('<H1>Hello Express!</H1>');

res.render('home.hbs',{
  welcome: 'Welcome to Home Page',
  currentYear: new Date().getFullYear(),
  pageTitle: 'Home Page'
})
});

app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Invalid Url'
  });
})


app.listen(3000 ,()=>{
  console.log('Started the server...');
});

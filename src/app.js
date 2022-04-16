const express = require("express");
const hbs = require("hbs");
const app = express();
const port  = process.env.port || 3000;
const staticPath = `${__dirname}/../public`;
const templatePath =  `${__dirname}/../template/views`;
const partialPath = `${__dirname}/../template/partials`;


app.set('view engine','hbs');
app.set('views',templatePath);

hbs.registerPartials(partialPath);

app.use(express.static(staticPath));

app.get("/",(req,res) => {
    // res.send("helo ji");
    res.render("index");
});

app.get("/about",(req,res)=>{
    // res.send("contactus");
    res.render("about");
});

app.get("/weather",(req,res)=>{
    // res.send("contactus");
    res.render("weather");
});

app.get("*",(req,res)=>{
    res.render("error404");
});


app.listen(port,() =>{
    console.log("listining to the port " + port);
});


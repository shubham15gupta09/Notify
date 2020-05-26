const schema = require("./Model/schema");
const credentials = require("./key") ;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const val = credentials ;
const uri =
    "mongodb+srv://"+val[0]+":"+val[1]+"@cluster0-khprr.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(
    uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    () => console.log("DB Connected")
);
app.set('view engine', 'ejs'); 

app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json({}));

app
    .get("/", (req, res) => {
        res.sendFile(__dirname + "/Views/home.html");
    })
    .get("/Views/post.html", (req, res) => {
        res.sendFile(__dirname + "/Views/post.html");
    })
    .get("/Views/home.html", (req, res) => {
        res.sendFile(__dirname + "/Views/home.html");
    })
    .get("/home.html", (req, res) => {
        res.sendFile(__dirname + "/Views/home.html");
    })
    .get("/Views/view.html", (req, res) => {
        res.sendFile(__dirname + "/Views/view.html");
    })
    .post("/data", (req, res) => {
        schema
            .create(req.body)
            .then((result) =>
                console.log({
                    message: "Entered into DB",
                    Post: result,
                })
            )
            .catch((err) => {
                console.log(err);
            });
            res.sendFile(__dirname + "/Views/home.html");
    })
    .post("/view", (req, res) => {
        schema
            .find({
                date: req.body.date,
            })
            .sort({"date":1})
            .select("postname date Content postedby")
            .then((result) => {
                    res.render("view.ejs" ,{
                        value :result
                    } ) ;
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .get("/viewall" , (req,res)=>{
        schema
        .find({})
        .sort({"date":1})
        .select("postname date Content postedby")
        .then((result) => {
            res.render("view.ejs" ,{
                value :result
            } ) ;
        })
        .catch((err) => {
            console.log(err);
        });        
    }) ;

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});
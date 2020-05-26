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

app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json({}));

app
    .get("/", (req, res) => {
        res.sendFile(__dirname + "/View/home.html");
    })
    .get("/View/post.html", (req, res) => {
        res.sendFile(__dirname + "/View/post.html");
    })
    .get("/View/view.html", (req, res) => {
        res.sendFile(__dirname + "/View/view.html");
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

        res.send({
            message: "Got the information",
            data: req.body,
            Go_to_home: "http://localhost:3000/",
        });
    })
    .post("/view", (req, res) => {
        schema
            .find({
                date: req.body.date,
            })
            .select("postname date Content postedby")
            .then((result) => {
                console.log({
                    message: "Entered into DB",
                    Post: result,
                });
                res.send({
                    message: "Notification for the selected Date : "+result[0].date ,
                    Info: result,
                    Go_to_home: "http://localhost:3000/",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .get("/viewall" , (req,res)=>{
        schema
        .find({})
        .select("postname date Content postedby")
        .then((result) => {
            res.send({
                message: "All Notification",
                Info: result,
                Go_to_home: "http://localhost:3000/",
            });
        })
        .catch((err) => {
            console.log(err);
        });        
    }) ;

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});
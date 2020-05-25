const express = require("express" );
const app = express() ;
const bodyParser = require("body-parser") ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({})) ;

app.get("/" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/home.html") ;
}) ;
app.get("/Index/post.html" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/post.html") ;
}) ;
app.get("/Index/view.html" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/view.html") ;
}) ;

app.post("/data" , (req,res)=>{
    res.send({
        message : "Got the information" ,
        data : req.body,
        Go_to_home : "http://localhost:3000/"
    });
});

app.listen( 3000 , () => {
    console.log("Server started at http://localhost:3000/")
}) ;
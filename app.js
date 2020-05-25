const express = require("express" );
const app = express() ;

app.get("/" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/home.html") ;
}) ;
app.get("/post.html" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/post.html") ;
}) ;
app.get("/view.html" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/view.html") ;
}) ;

app.listen( 3000 , () => {
    console.log("Server started at http://localhost:3000/")
}) ;